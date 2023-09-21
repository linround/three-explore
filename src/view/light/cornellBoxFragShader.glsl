uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform int iFrame;
uniform sampler2D iChannel0;
#define TWO_PI 6.28318530718
#define PI 3.1415926
#define TMIN     0.1
#define TMAX     3000.0

#define ID_NONE           -1.0
#define ID_FLOOR           0.10
#define ID_CEILING         0.11
#define ID_WALL_BACK       0.12
#define ID_WALL_RIGHT      0.13
#define ID_WALL_LEFT       0.14
#define ID_LIGHT           0.15
#define ID_SPHERE_REFRACT  0.16
#define ID_SPHERE_REFLECT  0.17
#define ID_VOID            1.0

#define GLASS_REFRACTION_INDEX    1.5

// http://www.graphics.cornell.edu/o nline/box/data.html
const vec4 FLOOR          = vec4(300.0, 0.0, 300., ID_FLOOR);// 定义地板的宽度 高度 深度
const vec4 CEILING        = vec4(278.0, 0.0, 279.6, ID_CEILING);// 定义天花板的宽度 高度 深度
const vec4 WALL_BACK      = vec4(278.0, 274.4, 0.0, ID_WALL_BACK);// 定义后墙的宽度 高度 深度
const vec4 WALL_RIGHT     = vec4(0.0, 274.4, 279.6, ID_WALL_RIGHT);// 定义右墙的宽度 高度 深度
const vec4 WALL_LEFT      = vec4(0.0, 274.4, 279.6, ID_WALL_LEFT);// 定义左墙的宽度 高度 深度
const vec4 LIGHT          = vec4(50.0, 5.0, 50., ID_LIGHT);// 定义灯的宽度 高度 深度
const vec4 SPHERE_REFRACT = vec4(50.0, 0.0, 0.0, ID_SPHERE_REFRACT);// 折射球 半径
const vec4 SPHERE_REFLECT = vec4(100.0, 0.0, 0.0, ID_SPHERE_REFLECT); // 反射球 半径


const vec3 FLOOR_CENTER = vec3(-278.,-550,-279.6);// 定义地板的中心
const vec3 CEILING_CENTER = vec3(-278.,0,-279.6);// 定义天花板的中心
const vec3 WALL_BACK_CENTER = vec3(-278.,-274.4,-559.2);// 定义后墙 的中心
const vec3 WALL_RIGHT_CENTER = vec3(-556.,-274.4,-279.6);// 定义 右墙 的中心
const vec3 WALL_LEFT_CENTER = vec3(-0.,-274.4,-279.6);// 定义左墙 的中心
const vec3 lightPos = vec3(-200.0, 0.0, -200.);// 定义 灯 的中心
const vec3 SPHERE_REFRACT_CENTER = vec3(-380,-468,-166);// 定义折射球 的中心
const vec3 SPHERE_REFLECT_CENTER = vec3(-190,-448.8,-365.0);// 定义反射球 的中心

// 定义观察点的坐标
vec3 eye = vec3(-280, -280, 660);
vec3 ta = vec3(-560.0, -560, -560)*2.;

float sdBox(in vec3 p, in vec3 box) {
    vec3 d = abs(p) - box;
    return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

//返回
// res.x 存储投射到的物体ID
// res.y 存储投射端点离 物体的距离
vec2 intersectSpheres(in vec3 p, bool refrSph) {
    // hit object ID is stored in res.x, distance to object is in res.y

    // res.x 存储投射到的物体ID
    // res.y 存储投射端点离 物体的距离
    vec2 res = vec2(ID_VOID, 2000.0);

    if (refrSph){
        // 折射球
        res = vec2(ID_SPHERE_REFRACT, sdSphere(p - SPHERE_REFRACT_CENTER, SPHERE_REFRACT.x));
    }
    // 反射球
    vec2 obj = vec2(ID_SPHERE_REFLECT, sdSphere(p - SPHERE_REFLECT_CENTER, SPHERE_REFLECT.x));
    if (obj.y < res.y) {
        res = obj;
    }

    return res;
}

// p 是世界坐标系中的点，因为观察坐标系原点是eye的世界坐标系的坐标
// 同时   p的坐标点是通过迭代的方式，一步步进行逼近物体的
// 通过在观察坐标系中，从而来计算投影平面像素点上世界坐标系的坐标值
vec2 intersect(in vec3 p, bool refrSph) {
    // res.x 保存了光线投射到的物体ID
    // res.y 保存了当前 投射端点离物体表面的距离


    vec2 res = vec2(ID_VOID, 2000.0);

    // 这里是计算灯管处的SDF盒子
    vec2 obj = vec2(ID_LIGHT, sdBox(p - (lightPos), LIGHT.xyz));
    if (obj.y < res.y) {
        res = obj;
    }

    // 这里是计算地板处的SDF盒子
    obj = vec2(ID_FLOOR, sdBox(p - FLOOR_CENTER, FLOOR.xyz));
    if (obj.y < res.y) {
        res = obj;
    }
    // 这里是计算天花板处的SDF盒子
    obj = vec2(ID_CEILING, sdBox(p - CEILING_CENTER, CEILING.xyz));
    if (obj.y < res.y){
        res = obj;
    }

    // 这里是计算内墙壁的SDF盒子
    obj = vec2(ID_WALL_BACK, sdBox(p - WALL_BACK_CENTER, WALL_BACK.xyz));
    if (obj.y < res.y) {
        res = obj;
    }

    // 这里是计算右墙的SDF盒子
    obj = vec2(ID_WALL_RIGHT, sdBox(p - WALL_RIGHT_CENTER, WALL_RIGHT.xyz));
    if (obj.y < res.y) {
        res = obj;
    }

    // 这里是计算左墙的SDF盒子
    obj = vec2(ID_WALL_LEFT, sdBox(p - WALL_LEFT_CENTER, WALL_LEFT.xyz));
    if (obj.y < res.y) {
        res = obj;
    }

    // 计算相交球体
    obj = intersectSpheres(p, refrSph);
    if (obj.y < res.y) {
        res = obj;
    }

    return res;
}

// res.x 保存了光线投射到的物体ID
// res.y 保存了当前 投射端点离物体表面的距离
// p是世界坐标系中的某个点
vec2 intersect(in vec3 p) {
    return intersect(p, true);
}

// ro 是观察点在世界坐标系的坐标 即 eye
// rd 即将像素点xy映射到 观察坐标系的 uv平面,坐标cu,cv
// rd 定义了一个cw（即观察坐标系的z轴） 固定的投影平面
// cw 方向 是观察点指向 目标的方向 即 target-eye
vec2 raymarchScene(in vec3 ro, in vec3 rd, in float tmin, in float tmax, bool refrSph) {
    vec3 res = vec3(ID_NONE);
    float t = tmin;// tmin 默认值为0.1
    for (int i = 0; i < 100; i++) {
        // p 点 是从eye出发，沿着投影平面上的点的方向行进
        // t 最开始是0.1，即行进的距离初始为0.1
        // 这里的p是世界坐标系的坐标点
        vec3 p = ro + rd * t;

        // res.x 保存了光线投射到的物体ID
        // res.y 保存了当前 投射端点离物体表面的距离
        // res.z 保存了从观察坐标系原点出发，距离物体表面的距离
        res = vec3(intersect(p, refrSph), t);
        float d = res.y;
        // 最终得到距离投射端点 小于dRange的物体对象
        float dRange = 0.05;
        if (d < dRange || t > tmax){
            break;
        }
        t += d;
    }
    // 最终返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
    return res.xz;
}

// 传入的是p点 即世界坐标系的某个点的坐标
vec3 getNormal(in vec3 p) {
    // 偏移值越小，就越接近该平面上的邻点，从而更准确的确定该点处的的变化速率和方向
    vec2 eps = vec2(0.001, 0.0);
    // 各轴偏移0.005
    // 偏移后 计算投射端点距离表面的变化值 Δ
    // 计算出在微小范围的偏移导致的 Δ，使用Δ来表示该点的法向量

    // 对交点 p各轴偏移后，计算偏移之后的两个点之间距离
    // 这里需要进行 正负偏移，进而确定该点处具体的偏移方向
    // 然后求取各方向的变化速率即可
    return normalize(vec3(
        (intersect(p + eps.xyy).y - intersect(p - eps.xyy).y)/(2.0*eps.x),// 计算Δx
        (intersect(p + eps.yxy).y - intersect(p - eps.yxy).y)/(2.0*eps.x), // 计算Δy
        (intersect(p + eps.yyx).y - intersect(p - eps.yyx).y)/(2.0*eps.x) //计算Δz
    ));
}

mat4 roateMat(in vec3 u,in float theta){
    float c = cos(theta) ;
    float s = sin(theta);
    u = normalize(u);
    // 以下是构建一个三维旋转矩阵的列
    vec4 c0 = vec4(u.x*u.x*(1.0-c)+c,u.x*u.y*(1.-c)+u.z*s,u.x*u.z*(1.-c)-u.y*s,0.0);
    vec4 c1 = vec4(u.x*u.y*(1.-c)-u.z*s,u.y*u.y*(1.-c)+c,u.y*u.z*(1.-c)+u.x*s,0.0);
    vec4 c2 = vec4(u.z*u.x*(1.-c)+u.y*s,u.z*u.y*(1.-c)-u.x*s,u.z*u.z*(1.-c)+c,0.0);
    vec4 c3 = vec4(0.,0.,0.,1.);
    return mat4(c0,c1,c2,c3);
}

float random (in float x) {
    return fract(sin(x)*1e4);
}
// ro 是某个点的坐标
// rd 是该点的法向量
// 使用一个随机轴对法向量旋转，得到新的向量
mat3 getTBN(in vec3 ro,in vec3 rd){
    vec3 temp = vec3(random(rd.x),random(rd.y),random(rd.x));
    temp = normalize(temp);
    rd = normalize(rd);
    vec3 tangent = cross(rd,temp);
    tangent = normalize(tangent);
    vec3 bitangent = cross(rd,tangent);
    bitangent = normalize(bitangent);
    return mat3(
    tangent,bitangent,rd);
}
// 均匀的取16个方向点
vec3[160] makeDirs(){
    vec3[160] items;
    float r = 1.0;
    for(int i=0;i<16;i++){
        for(int j=0;j<10;j++){
            int index = i*16+j;
            float phi = TWO_PI*float(i)/16.;
            float theta = PI*float(j)/10.;
            float z = r*sin(phi);
            float x = r*cos(phi)*cos(theta);
            float y = r*cos(phi)*sin(theta);
            items[index] = vec3(x,y,z);
        }
    }
    return items;
}
float tbnRenderAO(in vec3 ro, in vec3 rd) {
    float ao = 0.0;
    mat3 tbn = getTBN(ro,rd);
    vec3[160] dirs = makeDirs();
    float len = float(dirs.length());
    for (float i = 0.0; i < len; i++) {
        vec3 dir = dirs[int(i)];
        vec3 temp = dir.x*tbn[0]+dir.y*tbn[1]+dir.z*tbn[2];
        temp = normalize(temp);
        vec2 obj = raymarchScene(ro, temp, TMIN, TMAX, true);
        // 投射有击中物体
        // 说明有遮蔽，那么ao加该分量的比例
        if(obj.x ==ID_SPHERE_REFLECT ){
            rd = normalize(rd);
            float aspect = dot(rd,temp);
            // 计算 光线和法线方向
            float nd = dot(rd,lightPos-ro);
            // 小于0是球面背光处，大于零需要计算
            aspect = nd>0.?1.:aspect;
            ao+=(1.0*aspect);
        }

    }
    // ao 代表的是遮蔽的的情况
    // ao 越大,遮蔽因子越大，环境光照分量越小
    return 1.-ao/len;
}


float ambientOcclusion(vec3 p, vec3 n) {
    float step = 8.;
    float ao = 0.;
    float dist;
    int num = 4;
    for (int i = 1; i <= num; i++) {
        dist = step * float(i);
        // 这里计算每一步投射时的距离，找到距离该投射线最近的 物体位置
        // 当物体表面距离越靠近该投射线的投射端点，
        // 此时每次一投射结果的距离 会影响该因子的大小
        // 距离比投射距离 还大的就直接记为0
        // 距离再投射范围内的 使用下面的算法来统计该因子的影响程度
        float v = (dist - intersect(p + n * dist).y) / dist;
        ao += max(0., v);
    }
    return 1. - ao /float(num);
}
// ro 反射线方向进行投射时的交点位置
// rd 反射线方向进行投射时，交点处的法向量
// tmin 统一使用 80

// 环境光遮蔽计算
// 主要通过构建从表面上一点 朝其法线所在上半球的所有方向发出射线，
// 然后检查他们是否与其他对象相交来计算环境光遮蔽因子

// 这个遮蔽因子 用来估算环境光照分量的大小，遮蔽因子越大，环境光照分量越小
// 反之环境光越大。



// https://zhuanlan.zhihu.com/p/484196734
// http://frederikaalund.com/a-comparative-study-of-screen-space-ambient-occlusion-methods/
// SSAO 的技术实现的关键步骤
// 1.延迟
float raymarchAO(in vec3 ro, in vec3 rd) {
    return ambientOcclusion(ro,rd); // 普通的采样算法
//    return tbnRenderAO(ro,rd); // 计算TBN，均匀采样
}


float raymarchShadows(in vec3 ro, in vec3 rd, float tmin, float tmax) {
    float sh = 1.0;
    float t = tmin;
    for(int i = 0; i < 50; i++) {
        vec3 p = ro + rd * t;
        float d = intersectSpheres(p, true).y;
        sh = min(sh, 16.0 * d / t);
        t += 0.5 * d;
        if (d < (0.001 * t) || t > tmax)
        break;
    }
    return sh;
}

// obj 返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
// pos 投射的交点坐标
// rd 投射的方向 可当作入射光
// nor 投射交点处的法向量
// 获取该点各种反射光的集合结果
vec3 getLightColor(in vec2 obj, in vec3 pos, in vec3 rd, in vec3 nor) {
    // 定义漫反射光
    vec3 difColor = vec3(18.4, 15.6, 8.0);

    // main light
    // 光线方向从pos指向光源
    vec3 lightDir = normalize(vec3(lightPos.x, -125.0, lightPos.z) - pos);
    float lightDist = length(vec3(lightPos.x, -125.0, lightPos.z) - pos);
    float dif = max(0.0, dot(nor, lightDir));
    vec3 h = normalize(-rd + lightDir);
    float spe = pow(clamp(dot(h, nor), 0.0, 1.0), 4.0);
    vec3 lightColor = dif * difColor * (1.0 / lightDist);
    lightColor += 0.25 * dif * spe * difColor;

    lightDir = normalize(vec3(lightPos.x, 350.0, lightPos.z) - pos);
    float sha = clamp(raymarchShadows(pos, lightDir, 0.5, 500.0), 0.0, 1.0);
    float id = obj.x;
    if (id != ID_LIGHT && id != ID_CEILING) lightColor *= sha;

    // light bounce on back wall
    // 后墙壁中心点
    lightDir = normalize(WALL_BACK_CENTER - pos);
    lightDist = length(WALL_BACK_CENTER - pos);
    dif = max(0.0, dot(nor, lightDir));
    h = normalize(-rd + lightDir);
    spe = pow(clamp(dot(h, nor), 0.0, 1.0), 2.0);
    lightColor += dif * vec3(0.25, 0.175, 0.1) * (1.0 / lightDist);
    lightColor += 0.5 * dif * spe * vec3(0.25, 0.175, 0.1);

    // light bounce on right wall
    lightDir = normalize(WALL_RIGHT_CENTER - pos);
    lightDist = length(WALL_RIGHT_CENTER - pos);
    dif = max(0.0, dot(nor, lightDir));
    h = normalize(-rd + lightDir);
    spe = pow(clamp(dot(h, nor), 0.0, 1.0), 2.0);
    lightColor += dif * vec3(0.0, 0.5, 0.0) * (1.0 / lightDist);
    lightColor += 0.5 * dif * spe * vec3(0.0, 0.5, 0.0);

    // light bounce on left wall
    lightDir = normalize(WALL_LEFT_CENTER - pos);
    lightDist = length(WALL_LEFT_CENTER - pos);
    dif = max(0.0, dot(nor, lightDir));
    h = normalize(-rd + lightDir);
    spe = pow(clamp(dot(h, nor), 0.0, 1.0), 2.0);
    lightColor += dif * vec3(1.5, 0.0, 0.0) * (1.0 / lightDist);
    lightColor += 0.5 * dif * spe * vec3(1.5, 0.0, 0.0);

    float amb = clamp(0.75 + 0.25 * nor.y, 0.0, 1.0);
    lightColor += 0.015 * amb * difColor;

    return lightColor;
}

vec3 getWallColor(in vec2 obj) {
    vec3 color = vec3(0.0);
    float id = obj.x;
    if (id == ID_FLOOR) color = vec3(0.5);// 地板的颜色
    if (id == ID_CEILING) color = vec3(1.0, 0.0, 1.0);// 天花板的颜色
    if (id == ID_WALL_BACK) color = vec3(0.0, 1.0, 0.0);// 后墙的颜色
    if (id == ID_WALL_RIGHT) color = vec3(1.0, 0.0, 0.0);// 右墙的颜色
    if (id == ID_WALL_LEFT) color = vec3(0.0, 0.0, 1.0);// 左墙的颜色
    if (id == ID_LIGHT) color = vec3(1.0);// 灯光box的颜色
    return color;
}

vec3 getBoxColor(in vec2 obj, in vec3 pos, in vec3 rd, in vec3 nor) {
    // 得到击中的物体颜色
    vec3 color = getWallColor(obj);
    // 计算该点击中处的遮蔽因子
    float occ = clamp(raymarchAO(pos, nor), 0.0, 1.0);
    // 获取该点各种反射光的集合结果
    color *= getLightColor(obj, pos, rd, nor) * occ;
    return color;
}

// pos 首次投射的交点坐标
// rd 首次投射的方向
// nor 首次投射处的法向量
vec3 getMirrorBallColor(in vec3 pos, in vec3 rd, in vec3 nor) {
    // 首次投射击中镜面, 镜面直接发生反射
    // 反射向量 refl
    vec3 refl = reflect(rd, nor);
    // 从首次集中镜面出的位置，对反射方向进行投射
    // robj 包括了击中物体的ID和距离
    vec2 robj = raymarchScene(pos, refl, TMIN, TMAX, true);
    // 找到反射线击中物体的位置
    vec3 rpos = pos + refl * robj.y;
    // 得到该位置处的法线
    vec3 rnor = getNormal(rpos);
    // 得到反射线击中的物体的颜色
    vec3 color = getWallColor(robj);
    // 得到反射线击中物体位置处的光线遮蔽因子
    float occ = clamp(raymarchAO(rpos, rnor), 0.0, 1.0);
    // 反射击中的是折射球
    // 重新计算经过折射后的的光线击中的颜色和 击中处的环境遮蔽因子
    if (robj.x == ID_SPHERE_REFRACT) {
        // refl 发射首次击中时的反射向量，可以认为是击中折射球的入射光线
        // rnor 首次反射线 击中处的位置的法向量，即击中的折射球体处的法向量
        // 折射球此时产生反射线
        vec3 rrefl = reflect(refl, rnor);
        vec2 reflObj = raymarchScene(rpos, rrefl, TMIN, TMAX, true);
        vec3 reflPos = rpos + rrefl * reflObj.y;
        vec3 reflNor = getNormal(reflPos);
        float reflOcc = clamp(raymarchAO(reflPos, reflNor), 0.0, 1.0);

        // 折射球此时产生折射线
        vec3 refr = refract(refl, rnor, 1.0 / (GLASS_REFRACTION_INDEX * 2.0));
        robj = raymarchScene(rpos, refr, TMIN, TMAX, false);
        rpos = rpos + refr * robj.y;
        //
        rnor = getNormal(rpos);
        color = getWallColor(robj);
        float occ = clamp(raymarchAO(rpos, rnor), 0.0, 1.0);
        color *= occ;

        // 折射球处的颜色 以产生折射线击中的颜色为底色，反射线为目标色进行适配
        color = mix(color, getWallColor(reflObj) * reflOcc, 0.02);
    }
    // getLightColor 获取该点各种反射光的集合结果
    color *= getLightColor(robj, rpos, refl, rnor) * occ;

    return color;
}


// 玻璃材质有折射和反射
// 这里先计算了反射

// pos 投射交点坐标
// rd 观察坐标系中，观察平面像素点与观察点之间的投射方向，（x,y,1）
// nor 交点处的表面法向量
vec3 getGlassBallColor(in vec3 pos, in vec3 rd, in vec3 nor) {
    // 玻璃面上的点的反射计算
    // 这里求反射向量 rd是入射向量，nor该点的法线方向
    vec3 refl = reflect(rd, nor);
    // 这里以交点处为起点  从该点以 反射方向进行投射。
    // 投射 最终返回的是 投射到的对象的ID 以及投射起始点距离物体表面点的距离
    vec2 reflObj = raymarchScene(pos, refl, TMIN, TMAX, true); // 反射遇见的物体
    // 计算出反射线从交点pos进行投射时交点处的坐标
    vec3 reflPos = pos + refl * reflObj.y;
    // 再次计算反射线投射时，交点处的法向量
    vec3 reflNor = getNormal(reflPos);


    // reflPos 反射线方向进行投射时的交点位置
    // reflNor 反射线方向进行投射时，交点出的法向量
    float reflOcc = clamp(raymarchAO(reflPos, reflNor), 0.0, 1.0);



    // 玻璃面上的点的折射计算
    // refract 根据入射向量，法向量，折射率的关系计算折射方向
    vec3 refr = refract(rd, nor, 1.0 / GLASS_REFRACTION_INDEX);
    // 计算折射光线在场景中的交点（不考虑折射球）
    // 最终返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
    vec2 robj = raymarchScene(pos, refr, TMIN, TMAX, false);
    // 找到折射光线与物体相交的点
    vec3 rpos = pos + refr * robj.y;
    // 计算折射光线的交点处的法向量
    vec3 rnor = getNormal(rpos);

    // 得到该交点处的基本颜色
    // getWallColor 得到的始终是物体的颜色；因为其传入的始终是光线与某个对象的相交信息
    //
    vec3 color = getWallColor(robj);
    // raymarchAO是求像素点的光线遮蔽，得到环境光遮蔽因子
    // 这是光线交点处的环境遮蔽因子
    float occ = clamp(raymarchAO(rpos, rnor), 0.0, 1.0);

    // 玻璃球实际是一个折射球
    // 玻璃球的折射光线 投射击中了反射球
    if (robj.x == ID_SPHERE_REFLECT) {
        // refr 折射向量
        // rnor 折射向量投射处的交点法向量
        // 由于折射光线击中反射球
        // rrefl 为再次计算的折射线集中反射球处的 反射向量
        vec3 rrefl = reflect(refr, rnor);
        // robj 折射光线交点处的反射光线 进行投射 相交的物体
        // rpos 折射光线的起始位置
        // rrefl 折射光线击中物体处 产生的反射光线
        robj = raymarchScene(rpos, rrefl, TMIN, TMAX, true);

        // 折射光线的反射 光线 集中场景中物体的位置
        rpos = rpos + rrefl * robj.y;
        // 计算该点的法向量
        rnor = getNormal(rpos);

        // 计算该点处的实际颜色
        color = getWallColor(robj);
        // 折射光线的反射光线集中了 折射球
        if (robj.x == ID_SPHERE_REFRACT) {
            // rrefl 折射光线集中的反射球处的反射向量
            // rnor 折射光线击中处的反射光线 击中折射球的法向量
            // rrefr 折射球产生的折射光线
            vec3 rrefr = refract(rrefl, rnor, 1.0 / (GLASS_REFRACTION_INDEX * 2.0));
            // 折射球此时产生的折射光线再次 击中物体
            vec2 rrobj = raymarchScene(rpos, rrefr, TMIN, TMAX, false);
            // 计算击中物体处的位置
            vec3 rrpos = rpos + rrefr * rrobj.y;
            // 集中处的位置的法向量
            vec3 rrnor = getNormal(rrpos);
            // 击中处的颜色
            color = getWallColor(rrobj);
            // 计算环境光遮蔽因子
            float occ = clamp(raymarchAO(rrpos, rrnor), 0.0, 1.0);
            color *= occ;
        }
        float occ = clamp(raymarchAO(rpos, rnor), 0.0, 1.0);
        color *= occ;
    }
    vec3 reflColor = getWallColor(reflObj);
    reflColor *= reflOcc;
    // 因为场景中只有一个反射球
    // 以下条件语句是否执行作用不大
    if (reflObj.x == ID_SPHERE_REFLECT) {
        vec3 rrefl = reflect(refl, reflNor);
        reflObj = raymarchScene(reflPos, rrefl, TMIN, TMAX, true);
        reflPos = reflPos + rrefl * reflObj.y;
        reflNor = getNormal(reflPos);
        reflColor = getWallColor(reflObj);
        float occ = clamp(raymarchAO(reflPos, reflNor), 0.0, 1.0);
        reflColor *= occ;
    }

    // getLightColor 获取该点各种反射光的集合结果
    color *= getLightColor(robj, rpos, refr, rnor) * occ;
    color = mix(color, reflColor, 0.5);

    return color;
}

// obj 返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
// pos 首次投射的交点坐标
// rd 首次投射的方向 可当作入射光
// nor 首次投射处的法向量
vec3 getFloorColor(in vec2 obj, in vec3 pos, in vec3 rd, in vec3 nor) {
    // obj 返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
    // pos 首次投射的交点坐标
    // rd 首次投射的方向 可当作入射光
    // nor 首次投射处的法向量
    vec3 color = getBoxColor(obj, pos, rd, nor);

    vec3 lightDir = normalize(vec3(lightPos.x, 500.0, lightPos.z) - pos);
    vec2 robj = raymarchScene(pos, lightDir, TMIN, TMAX, true);
    if (robj.x == ID_SPHERE_REFRACT) {
        vec3 rpos = pos + lightDir * robj.y;
        vec3 rnor = getNormal(rpos);
        vec3 refr = refract(lightDir, rnor, 1.0 / GLASS_REFRACTION_INDEX);
        robj = raymarchScene(rpos, refr, TMIN, TMAX, false);
        rpos = rpos + refr * robj.y;
        rnor = getNormal(rpos);
        if (robj.x == ID_LIGHT) {
            vec3 difColor = vec3(18.4, 15.6, 8.0);
            float occ = clamp(raymarchAO(pos, nor), 0.0, 1.0);
            color = mix(color, difColor * occ, 0.05);
        }
    }
    return color;
}

mat3 roateX(float angle){
    float c = cos(angle);
    float s = sin(angle);

    vec3 c1 = vec3(1,0,0);
    vec3 c2 = vec3(0,c,s);
    vec3 c3 = vec3(0,-s,c);
    return mat3(
    c1,c2,c3
    );
}

mat3 roateY(float angle){
    float c = cos(angle);
    float s = sin(angle);

    vec3 c1 = vec3(c,0,-s);
    vec3 c2 = vec3(0,1,0);
    vec3 c3 = vec3(s,0,c);
    return mat3(
    c1,c2,c3
    );
}
mat3 roateZ(float angle){
    float c = cos(angle);
    float s = sin(angle);

    vec3 c1 = vec3(c,s,0);
    vec3 c2 = vec3(-s,c,0);
    vec3 c3 = vec3(0,0,1);
    return mat3(
    c1,c2,c3
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 定义屏幕的宽度
    float width = 2.;
    // 转换坐标范围 到[-1,1]
    vec2 p =  fragCoord.xy / iResolution.xy;


//    eye.xyz *= roateX(iTime);
    //    eye.xyz *= roateY(iTime);
    //    eye.xyz *= roateY(iTime);

    vec3 ro = eye;

    // 观察点指向 目标物体 的方向向量
    vec3 cw = normalize(ta - ro);
    // 使用y轴作为向上的向量，求得垂直于 y轴和cw方向向量所称平面的 cu向量
    // 得到 观察坐标系的三个基底， cw,y,cu
    vec3 cu = normalize(cross(vec3(0.0, 1.0, .0), cw));
    // 重新吹顶y这个向量，使得 cw cv cu 是互相垂直的
    // cw y cv 是共面的三个坐标向量（y可能不垂直cw，但是cv是垂直于cw的）
    vec3 cv = normalize(cross(cw, cu));
    // 最终得到新的由 cu cv cw 组成的互相垂直的基底所形成的坐标系
    // cw 是观察点指向 目标的向量
    // cu 垂直于 cw于y轴形成的平面
    // cv 垂直于 cw于cu
    // 观察坐标系的原点实际就是 观察点(即eye坐标点)
    mat3 cam = mat3(cu, cv, cw);


    // 眼睛指向目标位置 方向 cw 作为 观察坐标系的 z 轴
    // 与y,cw共面的        cv 作为观察坐标系的 y 轴
    // 垂直于cw,cv的       cu 作为观察坐标系的 x 轴
    vec3 rd =   normalize(vec3(p.xy,1.))*cam;

    // 背景色
    vec3 color = vec3(0.);

    // 首次投射
    // 找到光线在场景中的交点物体
    // ro 是观察点在世界坐标系中的坐标
    // rd 的xy 平面实际就是 当前的像素平面，也就是观察坐标系的 cu,cv平面
    // 最终返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
    vec2 obj = raymarchScene(ro, rd, TMIN, TMAX, true);

    // obj 是得到的最终投射到的物体对象
    // obj.x 是该投射对象的物体ID
    // obj.y 观察点距离距离物体表面点的距离
    float id = obj.x;

    if (id != ID_VOID) {
        // t 是观察点距离对象表面的距离
        float t = obj.y;
        // 求得表面处点的坐标
        // 观察点+距离*观察坐标系的基地
        // pos 是表面点的在世界坐标系中的坐标点
        // 且pos是某个物体表面与投射线的交点位置处
        vec3 pos = ro + rd * t;
        // 得到该交点处的法向量
        vec3 nor = getNormal(pos);

        // 折射球体是玻璃材质

        // 判断
        // 击中的是折射球
        if (id == ID_SPHERE_REFRACT) {
            // pos 交点坐标
            // rd 观察坐标系中，观察平面像素点与观察点之间的投射方向
            // nor 交点处的表面法向量
            color = getGlassBallColor(pos, rd, nor); // 玻璃球 折射
        }
        // 击中的是反射球
        else if (id == ID_SPHERE_REFLECT) {
            // pos 首次投射的交点坐标
            // rd 首次投射的方向
            // nor 首次投射处的法向量
            color = getMirrorBallColor(pos, rd, nor); // 镜面球 高光
        }
        // 首次投射击中的是地板
        else if (id == ID_FLOOR) {
            // obj 返回的是 投射到的对象的ID 以及观察点距离距离物体表面点的距离
            // pos 首次投射的交点坐标
            // rd 首次投射的方向 可当作入射光
            // nor 首次投射处的法向量
            color = getFloorColor(obj, pos, rd, nor); // 地面
        }
        else {
            color = getBoxColor(obj, pos, rd, nor); // 墙体
        }
    }

    // gamma correction
    vec3 gamma = vec3(1.0 / 2.2);
    fragColor = vec4(pow(color, gamma), 1.0);
}


void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
