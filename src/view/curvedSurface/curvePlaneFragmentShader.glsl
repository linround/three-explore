uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


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

vec3 lineAPoint(in vec2 st){
    float Az = 2.;
    float y = st.x*st.x*2.;

    mat4 roate = roateMat(vec3(1,1,1),iTime);
    vec3 p =vec3(st.x,y,Az);
    return (vec4(p,1.)*roate).xyz;
}
vec3 lineBPoint(in vec2 st){
    float Bz = 2.;
    float y = pow(st.x,2.);
    return vec3(st.x,y,Bz);
}
// 点的透视投影
vec2 pointPerspective(vec3 point){
    vec3 projectPoint = vec3(0.,0.,10.);
    vec3 viewPlane = vec3(0.,0.,2.);

    // 利用相似三角形原理
    float aspect = (viewPlane.z - projectPoint.z)/(point.z-projectPoint.z);
    float x = aspect * (point.x-projectPoint.x)+projectPoint.x;
    float y = aspect * (point.y-projectPoint.y)+projectPoint.y;
    return vec2(x,y);
}

// a,b为线段的两端点
float sdfLine(in vec2 p,in vec2 a,in vec2 b){
    vec2 ap = p-a;
    vec2 ab = b-a;
    float h = dot(ap,ab)/dot(ab,ab);
    vec2 qp = ap - clamp(h,0.,1.)*ab;

    return length(qp);
}
vec3 renderPlane(in vec2 st){
    vec3 color = vec3(0.);
    vec3 pointA = lineAPoint(st);
    vec3 pointB = lineBPoint(st);

    vec2 A = pointPerspective(pointA);
    vec2 B = pointPerspective(pointB);

    if(sdfLine(st,A,B)<1.){
        color = vec3(1.);
    }

    return color;
}

vec3 renderCurvePlane( in vec2 st){
    vec3 color = vec3(st.x,st.y,0.5);
    return color;
}
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0)-1.0;
    st*=10.;
//    vec3 color = renderCurvePlane(st);
    vec3 color = renderPlane(st);
    gl_FragColor = vec4(color,1.);
}
