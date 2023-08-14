uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718






// 这里定义的
mat4 gModel = mat4(
    1,0,0,0, //长 x
    0,1,0,0, // 宽 z
    0,0,1,0, // 高 y
    0,0,0,1);


//Single point projection
// 该假设 模型的坐标轴 和 实际空间坐标轴 重合时
//  比如从 y 方向观察 模型 对模型进行投影
vec2 Project(vec3 p0)
{

//    vec3 vanish = vec3(3.0,0.0,0.0);
//    //  计算投影方向
//    p0 -= vanish;
//
//    return length(vanish) / p0.x * p0.yz;


//    在z方向上进行观察
//    以下投影是在xy平面上
//  Zprp 是观察点，Zvp 是要投影的平面Z轴坐标，投影面距离观察点越近，投影结果就会越小
    vec3 Zprp = vec3(0.0,0.0,3.0); // 观察点的坐标
    vec3 Zvp = vec3(0.0,0.0,2); // 投影到的点的z轴坐标                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

    float u = (Zvp.z - Zprp.z)/(p0.z-Zprp.z);
    //  计算投影方向
//    1.计算投影点和 观察点的向量
//    2.计算在投影平面上的投影比例
//    3.此时利用相似三角形的性质，进行比例计算。得到新的位于投影平面上的坐标点
    float xvp = u*(p0.x-Zprp.x)+Zprp.x;
    float yvp = u*(p0.y-Zprp.y)+Zprp.y;

    return vec2(xvp,yvp);
}


//Angle-axis rotation

// 以u向量为轴，绕u向量旋转 角度 a
mat4 Rotate(vec3 u,float a)
{
    float c = cos(a);
    float s = sin(a);
//    在四元数的介绍中 2.1
//    https://krasjet.github.io/quaternion/quaternion.pdf
//    在进行任何计算之前需要将这个旋转轴u 转化为一个单位向量
    u = normalize(u);

    vec3 c0 = vec3((u.x*u.x) * (1.0-c) + c,       (u.y*u.x) * (1.0-c) + (u.z*s),   (u.z*u.x) * (1.0-c) - (u.y*s));
    vec3 c1 = vec3((u.x*u.y) * (1.0-c) - (u.z*s), c + (u.y*u.y) * (1.0-c),         (u.z*u.y) * (1.0-c) + (u.x*s));
    vec3 c2 = vec3((u.x*u.z) * (1.0-c) + (u.y*s), (u.y*u.z) * (1.0-c) - (u.x*s),   c + (u.z*u.z) * (1.0-c));


    // 也可以写作 mat4(mat3(c0,c1,c2));
    return mat4(
    vec4(c0,0.0),
    vec4(c1,0.0),
    vec4(c2,0.0),
    vec4(0.0,0.0,0.0,1.0));
}

mat4 Scale(vec3 v)
{
    return mat4(
    vec4(v.x,0,0,0),
    vec4(0,v.y,0,0),
    vec4(0,0,v.z,0),
    vec4(0,0,0,1));
}



float plotPoint(in vec2 center,in vec2 point){
    float dist = distance(center,point);
    return dist>0.01?0.0:1.0;
}


float normalCubeLine(vec3 p0,vec3 p1,vec2 uv){

    // 使用传统方式，已知两个点，确认高点是否在其连线上
    // 对于 p0.x等于p0.y 即斜率为0的情况进行特殊处理

    vec2 line = p1.xy-p0.xy;
    float k = line.y/line.x;
    float b = p1.y-k*p1.x;
    float y = k*uv.x+b;
    float dist = abs(y-uv.y);
    float minX = min(p1.x,p0.x)+0.01;
    float maxX = max(p1.x,p0.x)+.01;
    float minY = min(p1.y,p0.y)+0.01;
    float maxY = max(p1.y,p0.y)+.01;
    if(line.x ==0.0){
        if(uv.y<maxY && uv.y>minY){
            if(abs(uv.x - minX)<0.01) {
                return 1.0;
            }
            if(abs(uv.x-maxX)<0.01){
                return 1.0;
            }
        }
        return 0.0;
    }else {
        if(uv.x<minX || uv.x>maxX){
            return 0.0;
        }
        return smoothstep(0.010, 0.0, dist);
    }
}

//Projected line
// 传入三维空间中的两个点坐标  和 一个投影平面
float Line3d(vec3 p0,vec3 p1,vec2 uv)
{
//    对p0点进行旋转和缩放 得到新的p0点
    p0 = (gModel*vec4(p0,1.0)).xyz;
//    对p1点进行旋转和缩放 得到新的p1点
    p1 = (gModel*vec4(p1,1.0)).xyz;


//    对缩放和旋转后的点进行投影，得到在投影平面上的坐标点
    p0.xy = Project(p0);
    p1.xy = Project(p1);

//    return plotPoint(p0.xy,uv.xy)+plotPoint(p1.xy,uv.xy);// 这里计算的是八个顶点的绘制情况




    //    return normalCubeLine(p0,p1,uv); // 使用传统的方式绘制立方体



    /*
//    这里设点固定两点，是为了更好的模拟判断 点是否在线段之上
    p1 = vec3(0.98,0.98,0.);
    p0 = vec3(0.,0.0,0.);
*/
//    计算投影后的坐标项链==向量，并进行归一化。这样可以计算得到对应的旋转角度
    vec2 dir = normalize(p1.xy - p0.xy);
    float dist = distance(p1.xy,p0.xy);

//    关于如何判断某个点 是否是某条线上的
//    计算当前坐标 到p0点的向量
//    将当前向量旋转与 p0p1 方向相同的角度

//    这里将uv与p0之间形成的向量逆时针旋转-θ度
//    θ是  投影后的p0和p1向量和x轴的角度

    vec2 rc1 =vec2(dir.x, dir.y);
    vec2 rc2 =vec2(-dir.y, dir.x);
    vec2 ruv = (uv - p0.xy)*mat2(
        rc1,rc2 // 注意这是列运算
    );




    //    这里可以这么认为
    //    1.ruv逆时针旋转-θ，当uv点是线段上的点的时候
    //    1.1 可以想象 ruv 即 uv-p0，旋转后的点 位于x轴上，并且 旋转后的点 x坐标位于 0~dist 之间.dist 即 p1-p0可以认为是旋转后的 p1-p0
    //    1.2 minx 这个时候实际就是取了 uv-p0 的 X坐标
    //    1.3 这个时候 ruv （uv-p0） 与 （minx，0）。实际是同一个坐标点，此时计算的距离d为0

    //    2. 当点不位于线段上的时候可分为两种情况
    //    2.1 uv位于线段的延长线上
    //    2.1.1 当位于线段延长线的时候，对ruv（uv-p0）进行逆时针旋转-θ 度，此时旋转后的 x 坐标 也会位于 0~dist 两端的延长线上
    //    2.1.2 此时计算的距离 就是取 x坐标 到 0 的距离了 此时会根据误差范围来判定 uv不再线段上
    //
    //    2.2 uv位于线段的两侧
    //    2.2.1 对于位于线段两侧的情况，宣祖安 ruv(uv-p0)在y轴距离上总会与 坐标轴有差距
    //    2.2.2 这个时候可以直接利用1.1-2 式 。计算y轴距离，或计算该点与两端点之间的距离
    //    2.2.3 根据误差范围来判断该店是否位于线段之上


//    clamp 进行选择一个较小的
    float minx = clamp(ruv.x,0.0,dist);//1.1-1 式
//     clamp(x,min,max)  该函数是取一个中间值
//    ruv 已经被旋转过
//    以下的相当于 将

    float d = distance(vec2(minx,0.0),ruv );// 1.1-2 式

//    d大于0.01的都是 返回0  d<0.0的都是返回1（距离是绝对值，不可能为负）
    return smoothstep(0.01, 0.0, d);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
//    平面坐标映射
    vec2 uv = ((fragCoord.xy / iResolution.xy)-0.50)*2.0;
//    将空间映射到[-3,3]
    uv *= 1.0;

    float time = iTime;

//    单位矩阵乘以 缩放矩阵 再乘以旋转矩阵
//    I*S*R
//    gModel *= Scale(vec3(0.5));
//    对gModel 进行了旋转  如果旋转了0° 在使用x,y,z 任意一个轴点进行观察时 都是一样的，结果看起来类似一个平面图形


//    以下定义了一个沿着y轴旋转  一定角度 的矩阵  ；所以 当沿着 x轴或z轴 进行观察投影时，可以看到一个相对立体的结果
    gModel *= Rotate(vec3(0, 1, 0), iTime*PI/6.0);


//    定义立方体八个顶点的坐标
    vec3 cube[8];
    cube[0] = vec3(-1,-1,-1);
    cube[1] = vec3( 1,-1,-1);
    cube[2] = vec3(-1, 1,-1);
    cube[3] = vec3( 1, 1,-1);
    cube[4] = vec3(-1,-1, 1);
    cube[5] = vec3( 1,-1, 1);
    cube[6] = vec3(-1, 1, 1);
    cube[7] = vec3( 1, 1, 1);

    vec3 cout = vec3(0);

//    下面 在空间中对点进行透视投影
    cout += Line3d(cube[0],cube[1], uv);
    cout += Line3d(cube[1],cube[3], uv);
    cout += Line3d(cube[3],cube[2], uv);
    cout += Line3d(cube[2],cube[0], uv);
//
////    上面
    cout += Line3d(cube[4],cube[5], uv);
    cout += Line3d(cube[5],cube[7], uv);
    cout += Line3d(cube[7],cube[6], uv);
    cout += Line3d(cube[6],cube[4], uv);
//
////   侧面
    cout += Line3d(cube[0],cube[4], uv);
    cout += Line3d(cube[5],cube[1], uv);
    cout += Line3d(cube[2],cube[6], uv);
    cout += Line3d(cube[7],cube[3], uv);

    cout *= vec3(1.0,1.0,0.0);

    fragColor = vec4(cout, 1.0);
}

void main(){
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
