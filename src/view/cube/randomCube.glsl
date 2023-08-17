uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718





// 定义立方体的八个顶点
vec3 vertexCubes[8] = vec3[](
    vec3(1.,1.,1.),
    vec3(-1.,1.,1.),
    vec3(-1.,1.,-1.),
    vec3(1.,1.,-1.),
    vec3(1.,-1.,-1.),
    vec3(1.,-1.,1.),
    vec3(-1.,-1.,1.),
    vec3(-1.,-1.,1.)
);


// 从z轴 进行平行正交投影
float projectOrthographicLine(in vec3 p0,in vec3 p1,in vec2 uv){
    float pct = 0.0;
    return pct;
}





void renderLineCube(in vec2 st){
    vec3 color = vec3(0.,0.,0.);
    vec3 lineColor = vec3(1.0,1.0,1.0);
    float pct = 0.0;
    pct+=projectOrthographicLine();









    color = mix(color,lineColor,pct);
    gl_FragColor = vec4(color,1.0);
}
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    // 将范围转换为[-1,1]
    st = (st*2.0)-1.0;
    // 将范围转换为[-3,3]
    st*=3.0;
    renderLineCube(st);
}
