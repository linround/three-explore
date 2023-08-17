uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718





mat4 roateMat(in vec3 u,in float theta){
    float c = cos(theta);
    float s = sin(theta);
    u = normalize(u);
    vec4 c0 = vec4(u.x*u.x*(1.0-c)+c,u.x*u.y*(1.-c)+u.z*s,u.x*u.z*(1.-c)-u.y*s,0.0);
    vec4 c1 = vec4(u.x*u.y*(1.-c)-u.z*s,u.y*u.y*(1.-c)+c,u.y*u.z*(1.-c)+u.x*s,0.0);
    vec4 c2 = vec4(u.z*u.x*(1.-c)+u.y*s,u.z*u.y*(1.-c)-u.x*s,u.z*u.z*(1.-c)+c,0.0);
    vec4 c3 = vec4(0.,0.,0.,1.);
    return mat4(c0,c1,c2,c3);
}



// 从z轴 进行平行正交投影
float projectOrthographicLine(in vec3 p0,in vec3 p1,in vec2 uv){
    float pct = 0.0;
    vec2 dir = normalize(p1.xy-p0.xy); // 计算方向向量
    float len = distance(p1.xy,p0.xy); // 计算向量长度
    float cosTheta = dir.x;
    float sinTheta = dir.y;


    mat2 roate2D = mat2(
    vec2(cosTheta,sinTheta),
    vec2(-sinTheta,cosTheta)
    );

    uv = (uv-p0.xy)*roate2D; // 旋转 -Θ 度。，然后比较在x轴上的距离;此时注意起点要以p0为起点。
    float minx = clamp(uv.x,0.0,len); // 在线段内部
    float d = distance(vec2(minx,0.0),uv);// 直接比较内部垂直点的距离
    pct = smoothstep(0.01,0.0,d);
    return pct;
}

float projectPerspectiveLine(in vec3 p0,in vec3 p1,in vec2 uv){
    return 0.0;
}










float project(in vec3 p0,in vec3 p1,in vec2 uv){
    return projectOrthographicLine(p0,p1,uv);
}



void renderLineCube(in vec2 st){
    float size = 1.0;
    // 定义立方体的八个顶点
    vec3 vertexCubes[8] = vec3[](
    vec3(1.,1.,1.),
    vec3(-1.,1.,1.),
    vec3(-1.,1.,-1.),
    vec3(1.,1.,-1.),
    vec3(1.,-1.,-1.),
    vec3(1.,-1.,1.),
    vec3(-1.,-1.,1.),
    vec3(-1.,-1.,-1.)
    );
    vec3 color = vec3(0.,0.,0.);
    vec3 lineColor = vec3(1.0,1.0,1.0);
    float pct = 0.0;
    mat4 roate = roateMat(vec3(1,1,1),iTime);

    for(int i=0;i<8;i++){
        vertexCubes[i] =(roate*vec4(vertexCubes[i]*size,0.0)).xyz;
    }



    pct+=project(vertexCubes[0],vertexCubes[1],st);
    pct+=project(vertexCubes[1],vertexCubes[2],st);
    pct+=project(vertexCubes[2],vertexCubes[3],st);
    pct+=project(vertexCubes[3],vertexCubes[0],st);
//
//
    pct+=project(vertexCubes[0],vertexCubes[5],st);
    pct+=project(vertexCubes[1],vertexCubes[6],st);
    pct+=project(vertexCubes[2],vertexCubes[7],st);
    pct+=projectOrthographicLine(vertexCubes[3],vertexCubes[4],st);
//
//
    pct+=project(vertexCubes[5],vertexCubes[6],st);
    pct+=project(vertexCubes[6],vertexCubes[7],st);
    pct+=project(vertexCubes[7],vertexCubes[4],st);
    pct+=project(vertexCubes[4],vertexCubes[5],st);







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
