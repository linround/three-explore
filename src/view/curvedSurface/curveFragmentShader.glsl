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

// 从某一点 p出发
// 沿着方向 dir
vec3 intersectWithWorld(vec3 p, vec3 dir){
    float dist = 0.0;
    float nearest = 0.0;
    vec3 result = vec3(0.0);
    // 计算
    for(int i = 0; i < 20; i++){
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
    vec3 cameraDirection = vec3(-1.0, .0, -1.0); // 相机的方向
    vec3 cameraUp = vec3(0.0, 1.0, 0.0); // 定义相机向上的向量


    vec2 camUV = uv*2.0 - vec2(1.0, 1.0);
    // 利用相机向上的向量与相机方向的叉乘，得到相机的另一个分量
    vec3 nright = normalize(cross(cameraUp, cameraDirection));

    vec3 pixel = cameraPosition + cameraDirection + nright*camUV.x + cameraUp*camUV.y;
    // 方向向量 由相机位置指向 坐标点位置
    vec3 rayDirection = normalize(pixel - cameraPosition);

    vec3 pixelColour = intersectWithWorld(cameraPosition, rayDirection);
    gl_FragColor = vec4(pixelColour, 1.0);
}


void main() {
    renderCurve();
}
