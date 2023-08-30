uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


const float boundary = 1.;
const float radius = boundary/2.;
const vec2 center = vec2(0.);


vec3 distColor(float dist){
    vec3 color = dist>0.?vec3(0.9,0.6,0.3) : vec3(0.65,0.85,1.0);
    color *=1.-exp(-6.*abs(dist));// 这里按照距离球体表面的值 进行颜色衰减
    color *=(1.+ 0.1*sin(150.*abs(dist)));// 对已有颜色乘以某种周期性的函数

    // smoothstep(0.01,0.,abs(dist)) 距离绝对值大于0.01 的都是0，距离绝对值小于等于0的 结果是1
    color = mix(color,vec3(1.),smoothstep(0.01,0.,abs(dist))); // 添加上边缘线条
    return color;
}


float sdfCircle(in vec2 st,in float r){
    return length(st-center)-r;
}

void renderCircleSDF(in vec2 st){
    float v = sdfCircle(st,radius);
    vec3 color = distColor(v);
    gl_FragColor = vec4(color,1.0);
}


float sdfLine(in vec2 p,in vec2 a,in vec2 b){
    return 0.5;
}

void renderLineSDF(in vec2 st){
    vec2 a = vec2(0.5);
    vec2 b = vec2(0.);
    float v = sdfLine(st,a,b);
    vec3 color = distColor(v);
    gl_FragColor = vec4(color,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0*boundary)-boundary;
    // renderCircleSDF(st);
    renderLineSDF(st);
}
