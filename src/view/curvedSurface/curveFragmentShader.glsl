uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


// epsilon-type values
const float S = 0.01;

// const delta vectors for normal calculation
const vec3 deltax = vec3(S ,0, 0);
const vec3 deltay = vec3(0 ,S, 0);
const vec3 deltaz = vec3(0 ,0, S);

// 这里有些类似3位的SDF
float distanceToNearestSurface(vec3 p){
    float s = 2.0;// 定义了长宽高的值
    vec3 d = abs(p) - vec3(s);
    return min(max(d.x, max(d.y,d.z)), 0.0) //这是计算内部的点 到表面的最小距离（负值）
    + length(max(d,0.0));// 这是计算外部坐标点 到表面的距离（正值）
}


// 计算 表面的法向量
// p是距离表面小于epsilon范围内的点
//
vec3 computeSurfaceNormal(vec3 p){
    // 距离表面的点具有正负值
    float d = distanceToNearestSurface(p);
    // 假设此时的点是外部的点（p） 且距离是0.005
    // 沿着 nright 加上 某个距离，那么此时的 距离是增加的
    // 那么实际得到的法向量 nright为正数
    // 同理，cameraUp，cameraDirection都是整数


    // 如果此时的点是内部的点p 且距离是 -0.005
    // 沿着 nright 加上 某个距离，那么此时的 可能变为-0.001，
    // 那么实际得到的法向量 nright为正数
    // 同理，cameraUp，cameraDirection都是整数

    // 通过得到在三个基方向上的变化率，从而得到下一个点的变化方向，
    // 即得沿着三个周的梯度变化方向
    // 这里可以看作是求平面方程系数（a,b,c）的方式来计算法向量
    return normalize(vec3(
    distanceToNearestSurface(p+deltax)-d,// nright 得到在 nright 方向的变化率
    distanceToNearestSurface(p+deltay)-d, // cameraUp 得到 cameraUp 方向的变化率
    distanceToNearestSurface(p+deltaz)-d // cameraDirection 得到 cameraDirection 方向的变化率
    ));
}


vec3 computeLambert(vec3 p, vec3 n, vec3 l){
    return vec3(dot(normalize(l-p), n));
}

// p 相机位置
// dir 相机位置指向观察平面上某一点的位置的向量

// p 是固定的 cameraPosition
// dir 是随着 x,y变化而变化，实际是由点cameraPosition 指向 由  nright和 cameraUp 组成的平面上的点

// 所以当cameraDirection 方向越大，x,y 所能扩展的范围也越小
// cameraDirection 越小，x,y 所能扩展的范围也越小
vec3 intersectWithWorld(vec3 p, vec3 dir){
    float dist = 0.0;
    float nearest = 0.0;
    vec3 result = vec3(0.0);
    // 计算cameraPosition 出发，沿着dir，移动dist个单位
    // 第一次循环时，
    // i的 的次数多少 与立方体的大小有关
    // i 8   r=1
    // i 13  r=2
    // 此时的i的最小次数为 cameraPosition到点的距离/ 初次计算时的最短的距离
    for(int i = 0; i < 13; i++){
        // 计算到表面的点的最近的距离
        // i= 0时，p+0 此时计算的是 cameraPosition 到立方体表面的最小距离 即沿着dir方向的距离 d0;此时d0范围较大
        // d0 值太大，此时没有计算出该点 直接在 进入i=1;
        // i= 1时，p+dir*d0 此时计算的是点实际就是立方体表面的点，计算的距离 d1=0
        // 通过将点沿着dir方向移动了d0距离，此时该点进入 d1的值在范围内，说明当前点属于立方体表面，即在改方向上找到了 对应的坐标点
        // 计算该店在模型中的位置，得到对应的颜色，直接跳出即可

        // 如果此时还未能在该方向上找到对应点，继续沿着斜线方向移动，直到找到最近的点

        vec3 point = p+dir*dist;
        // 此处根据 p点的位置和方向 设置光源的位置
        vec3 light = p-4.*dir;

        nearest = distanceToNearestSurface(point);

        // 如果点 p+dir*dist 距离表面在某个范围EPSILON 内，则被认为是表面的点
        float EPSILON = 0.01;
        if(nearest < EPSILON){
            result = computeLambert(point, computeSurfaceNormal(point), light);
            break;
        }
        dist += nearest;
    }
    return result;
}

void renderCurve() {
    vec2 uv = gl_FragCoord.xy/iResolution.xy;

    vec3 cameraPosition = vec3(5.0, .0, 5.0); // 相机位置
    vec3 cameraUp = vec3(0.0, 1.0, 0.0); // 定义相机向上的向量
    vec3 cameraDirection = vec3(-1.0, .0, -1.0); // 相机的方向


    vec2 camUV = uv*2.0 - vec2(1.0, 1.0);
    // 利用相机向上的向量与相机方向的叉乘，得到相机的另一个分量
    // 由上面的判断也可直接推理出 nright为(-1,0,1)
    vec3 nright = normalize(cross(cameraUp, cameraDirection));// 得到 由 cameraDiretion cameraUp nRight组成的基

    // nright和cameraUp都是单位向量
    // nright和cameraUp 组成的平面垂直于 cameraDirection
    // pct增大，相当于 将视点靠近原点，也就是更靠近物体
    // pct减小,相当于 将视点远离原点，也就是里物体越远

    float pct = 1.0;
    // 求得 cameraDirection 固定，平面上的坐标点
    // 也就是沿着相机 靠近原点位置是，中间的某个平面上的坐标点

    // 这里的pixel 的 在cameraDirection 方向是固定的值
    // 但是在 nright和 cameraUp 方向上对应这 原来平面的x,y值
    vec3 pixel = cameraPosition + pct * cameraDirection + nright*camUV.x + cameraUp*camUV.y;
    // 方向向量 由相机位置指向 坐标点位置
    // 这里 使用pixel 减去 cameraPosition
    // 最终得到就是 以cameraPosition 为原点
    // nright cameraUp cameraDirection 分别为 x,y,z轴的坐标系上的向量
    // 即cameraDirection 方向上是固定不变（或则说z轴控制远景），以nright，cameraUp组成的平面坐标不断变化

    vec3 rayDirection = normalize(pixel - cameraPosition);

    vec3 pixelColour = intersectWithWorld(cameraPosition, rayDirection);
    gl_FragColor = vec4(pixelColour, 1.0);
}


void main() {
    renderCurve();
}
