uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;

#define PI 3.1415926
#define TWO_PI 6.28318530718




vec3 distColor(float dist){
    vec3 color = dist>0.?vec3(0.9,0.6,0.3) : vec3(0.65,0.85,1.0);
    color *=1.-exp(-6.*abs(dist));// 这里按照距离球体表面的值 进行颜色衰减
    color *=(1.+ 0.1*sin(150.*abs(dist)));// 对已有颜色乘以某种周期性的函数

    // smoothstep(0.01,0.,abs(dist)) 距离绝对值大于0.01 的都是0，距离绝对值小于等于0的 结果是1
    color = mix(color,vec3(1.),smoothstep(0.01,0.,abs(dist))); // 添加上边缘线条
    return color;
}

// 中心点为0，半径为r
float sdfCircle(in vec2 st,in float r){
    vec2 center = vec2(0.);
    return length(st-center)-r;
}

void renderCircleSDF(in vec2 st,inout vec4 fragColor){
    float radius = (sin(iTime)+1.)/2.;
    float v = sdfCircle(st,radius);
    vec3 color = distColor(v);
    fragColor = vec4(color,1.0);
}


// a,b为线段的两端点
float sdfLine(in vec2 p,in vec2 a,in vec2 b){
    vec2 ap = p-a;
    vec2 ab = b-a;
    float h = dot(ap,ab)/dot(ab,ab);
    vec2 qp = ap - clamp(h,0.,1.)*ab;

    return length(qp);
}

void renderLineSDF(in vec2 st,inout vec4 fragColor){
    vec2 a = vec2(sin(iTime),0.5);
    vec2 b = vec2(0.,sin(iTime));
    float v = sdfLine(st,a,b);
    vec3 color = distColor(v);
    fragColor = vec4(color,1.0);
}

// 中心点为 （0,0）;长宽为 a
float sdfBox(in vec2 p,in vec2 a){
    vec2 q = abs(p)-a;
    return length(max(q,0.))+min(max(q.x,q.y),0.);
}

void renderBoxSDF(in vec2 st,inout vec4 fragColor){
    float width = (sin(iTime)+1.)/2.;
    float height = (cos(iTime)+1.)/2.;
    vec2 a = vec2(width,height);
    float v = sdfBox(st,a);
    vec3 color = distColor(v);
    fragColor = vec4(color,1.0);
}

float sdfRoundBox(in vec2 p,in vec2 a,in float r){
    vec2 b = a - vec2(r);
    vec2 q = abs(p)-b;
    // 这里求出新的 以b点的sdf
    // 为了弥补b失去的区域区域
    // 将计算b区域的计算结果在原有基础上减去r
    // 这样就能得到 原有坐标范围扩大了对应的r范围
    return length(max(q,0.))+min(max(q.x,q.y),0.)-r;
}
void renderRoundBoxSDF(in vec2 st,inout vec4 fragColor){
    float height = (cos(iTime)+1.)/2.;
    vec2 a = vec2(0.5,height);
    float r = 0.1;
    float v = sdfRoundBox(st,a,r);
    vec3 color = distColor(v);
    fragColor = vec4(color,1.0);
}

// 菱形
float rhombusSDF(in vec2 st,in vec2 range){
    float height = range.y;
    float width = range.x;
    vec2 p =abs(st);

    vec2 a = vec2(0.,height);
    vec2 b = vec2(width,0.);

    vec2 ap = p-a;
    vec2 ab = b-a;
    vec2 abDir = normalize(ab);
    float h = clamp( dot(ap,abDir)/dot(abDir,abDir) ,0.,length(ab));

    vec2 qp = ap-h*abDir;
    float s = sign(abDir.x*ap.y-ap.x*abDir.y);
    return s*(length(qp));
}
void renderRhombusSDF(in vec2 st,inout vec4 fragColor){
    float h = 0.5*(sin(iTime)+1.);
    float w = 0.5*(cos(iTime)+1.);
    vec2 range = vec2(h,w);
    float d = rhombusSDF(st,range);
    vec3 color = distColor(d);
    fragColor = vec4(color,1.);
}




float sideSDF(in vec2 p, in vec2 a,in vec2 b){
    vec2 ab = b-a;
    vec2 ap = p-a;
    vec2 abDir = normalize(ab);

    float h = dot(ap,ab)/dot(ab,ab);
    vec2 qp = ap-clamp(h,0.,1.)*ab;
    return length(qp);
}

bool sameSide(in vec2 uv,in vec3 A,in vec3 B,in vec3 C){
    vec3 p = vec3(uv,0.);
    vec3 side = B-A;
    // 判断p点和C点是否在边的同一侧
    vec3 n1 = cross(side,C-A);
    vec3 n2 = cross(side,p-A);
    if(dot(n1,n2)>=0.){
        return true;
    }
    return false;
}
bool inSide(in vec2 st,vec3[3] triangle){
    if(
    sameSide(st,triangle[0],triangle[1],triangle[2])&&
    sameSide(st,triangle[1],triangle[2],triangle[0])&&
    sameSide(st,triangle[2],triangle[0],triangle[1])
    ) { return true; }
    return false;
}
float d2Cross(in vec2 v1,in vec2 v2){
    // 叉乘结果大于0 返回1 逆时针
    // 叉乘结果小于0 返回-1 顺时针
    return (v1.x*v2.y-v2.x*v1.y);
}
float triangleSDF(in vec2 st,in vec2 a,in vec2 b,in vec2 c ){
    float s = sign(d2Cross(b-a,c-b));
    // 这里再次判断，点是位于外部还是内部，
    // 外部点 叉积结果 小于0，顺时针；内部点叉积结果大于0，逆时针
    // 再乘以s，
    float qp0 = sideSDF(st,a,b);

    float qp1 = sideSDF(st,b,c);

    float qp2 = sideSDF(st,c,a);

    float d = min(qp0,min(qp1,qp2));
    vec3 triangle[3] = vec3[3](
    vec3(a,0.),
    vec3(b,0.),
    vec3(c,0.)
    );
    bool i = inSide(st,triangle);// 判断点是否在三角形内部


    return i?-d:d;// 内部为负，外部为正
}
void renderTriangleSDF(in vec2 st,inout vec4 fragColor){
    float s = sin(iTime)+1.;
    float c = cos(iTime)+1.;
    vec2 v1 = vec2(0.3*s*c,0.5*c);
    vec2 v2 = vec2(0.5*s,0.4*c);
    vec2 v3 = vec2(-0.5*s,0.5*s);
    float d = triangleSDF(st,v1,v2,v3);
    vec3 color = distColor(d);
    fragColor = vec4(color,1.);
}


void renderTest(in vec2 st,inout vec4 fragColor){
    vec3 color1 = vec3(1.0,1.0,0.0);
    vec3 color2 = vec3(.0,0.5,1.0);
    vec3 color = min(color1,color2);
    fragColor = vec4(color,1.);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 st = fragCoord.xy/iResolution.xy;
    st*= 3.;
    st.x *= iResolution.x/iResolution.y;
    vec2 area = floor(st);
    if(area.x == 0.&&area.y ==0. ){
        st = fract(st);
        st= st*2.-1.;
        renderCircleSDF(st,fragColor);
    }
    if(area.x == 0.&&area.y ==1. ){
        st = fract(st);
        st= st*2.-1.;
        renderLineSDF(st,fragColor);
    }
    if(area.x == 1.&&area.y ==0. ){
        st = fract(st);
        st= st*2.-1.;
        renderBoxSDF(st,fragColor);
    }
    if(area.x == 1.&&area.y ==1. ){
        st = fract(st);
        st= st*2.-1.;
        renderRoundBoxSDF(st,fragColor);
    }
    if(area.x==2. && area.y == 2.){
        st = fract(st);
        st = st*2.-1.;
        renderRhombusSDF(st,fragColor);
    }
    if(area.x==0. && area.y == 2.){
        st = fract(st);
        st = st*2.-1.;
        renderTriangleSDF(st,fragColor);
    }
    if(area.x==1. && area.y ==2.){
        renderTest(st,fragColor);
    }
}


void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
