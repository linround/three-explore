uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


// epsilon-type values
const float S = 0.01;
const float EPSILON = 0.01;

// const delta vectors for normal calculation
const vec3 deltax = vec3(S ,0, 0);
const vec3 deltay = vec3(0 ,S, 0);
const vec3 deltaz = vec3(0 ,0, S);

// 这里有些类似3位的SDF
float distanceToNearestSurface(vec3 p){
    float s = 1.0;// 定义了长宽高的值
    vec3 d = abs(p) - vec3(s);
    return min(max(d.x, max(d.y,d.z)), 0.0) //这是计算内部的点 到表面的最小距离（负值）
    + length(max(d,0.0));// 这是计算外部坐标点 到表面的距离（正值）
}


// better normal implementation with half the sample points
// used in the blog post method
vec3 computeSurfaceNormal(vec3 p){
    float d = distanceToNearestSurface(p);
    return normalize(vec3(
    distanceToNearestSurface(p+deltax)-d,
    distanceToNearestSurface(p+deltay)-d,
    distanceToNearestSurface(p+deltaz)-d
    ));
}


vec3 computeLambert(vec3 p, vec3 n, vec3 l){
    return vec3(dot(normalize(l-p), n));
}

// p 相机位置
// dir 相机位置指向观察平面上某一点的位置的向量

// p 是固定的
// dir 是随着 x,y变化而变化

// 所以当cameraDirection 方向越大，x,y 所能扩展的范围也越小
// cameraDirection 越小，x,y 所能扩展的范围也越小
vec3 intersectWithWorld(vec3 p, vec3 dir){
    float dist = 0.0;
    float nearest = 0.0;
    vec3 result = vec3(0.0);
    // 计算
    for(int i = 0; i < 8; i++){
        // 计算到表面的点的最近的距离
        nearest = distanceToNearestSurface(p + dir*dist);
        if(nearest < EPSILON){
            vec3 hit = p+dir*dist;
            vec3 light = vec3(100.0, 30.0, 50.0);
            result = computeLambert(hit, computeSurfaceNormal(hit), light);
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
