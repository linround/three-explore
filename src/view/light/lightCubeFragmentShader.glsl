uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




// 以u为轴，旋转theta角度的三维旋转矩阵
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

vec3 viewProjectPoint = vec3(0,0,-10);
vec3 viewPlane = vec3(0,0,-5);
vec3[8] cube = vec3[8](
    vec3(1,-1,1),
    vec3(-1,-1,1),
    vec3(-1,1,1),
    vec3(1,1,1),
    vec3(1,-1,-1),
    vec3(-1,-1,-1),
    vec3(-1,1,-1),
    vec3(1,1,-1)
);



void renderLightCube(in vec2 st ){
    vec3 color = vec3(st,1.0);
    gl_FragColor= vec4(color,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    renderLightCube(st);
}
