uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define TWO_PI 6.28318530718
#define LINE

#define DISTCAMERA 10.
#define SIZE 1.0


//permet de fixer un point sur la surface d'un triangle (utile pour le zBuffer)
vec3 zFix(vec3 point, vec3 A, vec3 B,vec3 C)
{
    // AA BB CC point 都是在z=0 的同一个平面上
    vec3 AA = vec3(A.xy,0.);
    vec3 BB = vec3(B.xy,0.);
    vec3 CC = vec3(C.xy,0.);

    vec3 v0 = CC - AA;
    vec3 v1 = BB - AA;
    vec3 v2 = point - AA;

    float dot00 = dot(v0,v0);
    float dot01 = dot(v0,v1);
    float dot02 = dot(v0,v2);
    float dot11 = dot(v1,v1);
    float dot12 = dot(v1,v2);

    float inv = 1. / (dot00 * dot11 - dot01 * dot01);
    float u = (dot11 * dot02 - dot01 * dot12)*inv;
    float v = (dot00 * dot12 - dot01 * dot02)*inv;

    return A+u*(C-A)+v*(B-A);

}



bool sameside(vec2 uv, vec3 A, vec3 B, vec3 C)
{
    vec3 u = vec3(uv.x,uv.y,0.0);

    // 以AB为某条边
    // 判断点 C 和 uv 是否在 AB变得同一侧
    vec3 valuexy = cross(B-A,C-A);
    vec3 valuexz = cross(B-A,u-A);

    if(dot(valuexy,valuexz)>=0.){
        return true;
    } else {
        return false;
    }
}

// v 是 三角形三个 z固定且一致的 三维顶点坐标
// uv 的z轴可以默认与三角形顶点坐标位的z值一样
// 以上可以认为uv 和 三角形三个顶点在同一个z固定的平面上
bool inTriangle(vec2 uv,vec3 v[3])
{
    if(sameside(uv,v[0],v[1],v[2]) && sameside(uv,v[1],v[2],v[0]) && sameside(uv,v[2],v[0],v[1])){
        return true;
    } else {
        return false;
    }

}
//======================== LINE ========================
float segment(vec2 u, vec2 a, vec2 b)  {
    b -= a, u -= a;
    return length( u - b * clamp(dot(b, u) / dot(b, b), 0., 1.));
}

float line(vec2 uv, vec2 A,vec2 B, float width)
{
    float mysegment = segment(uv,A,B);
    mysegment = smoothstep(width,0.,mysegment);
    return mysegment;
}

//======================== 旋转矩阵  注意是 列向量组成的 ========================
mat3 rotateX(float angle){
    float cosPhi = cos(angle);
    float sinPhi = sin(angle);
    return mat3(1.,0.,0.,
    0.,cosPhi,sinPhi,
    0.,-sinPhi,cosPhi);
}

mat3 rotateY(float angle){
    float cosPhi = cos(angle);
    float sinPhi = sin(angle);
    return mat3(cosPhi,0.,-sinPhi,
    0.,1.,0.,
    sinPhi,0.,cosPhi);
}

mat3 rotateZ(float angle){
    float cosPhi = cos(angle);
    float sinPhi = sin(angle);
    return mat3(cosPhi,sinPhi,0.,
    -sinPhi,cosPhi,0.,
    0.,0.,1.);
}

mat3 scaleXYZ(vec3 scale){
    return mat3(scale.x,0.,0.,
    0.,scale.y,0.,
    0.,0.,scale.z);
}

// 立方体的八个顶点
const vec3 vertices[8] = vec3[](
    vec3(-1.,-1.,1.),
    vec3(1.,-1.,1.),
    vec3(-1.,1.,1.),
    vec3(1.,1.,1.),
    vec3(-1.,-1.,-1.),
    vec3(1.,-1.,-1.),
    vec3(-1.,1.,-1.),
    vec3(1.,1.,-1.)
);

// 每个立方体面 的三角形三个顶点
// 共十二个三角形面组成
// 每个三角形面由三个顶点构成
const int triOrderA[12] = int[](0,1,4,5,0,1,2,3,0,2,1,3);
const int triOrderB[12] = int[](1,2,5,6,1,4,3,6,2,4,3,5);
const int triOrderC[12] = int[](2,3,6,7,4,5,6,7,4,6,5,7);



// 定义了每个面上三角形的颜色
const vec3 triCol[12] = vec3[](
vec3(1.,0.,0.), // 前面
vec3(1.,0.,0.), // 前面
vec3(0.,1.,0.), // 后面
vec3(0.,1.,0.), // 后面
vec3(0.,0.,1.), // 下面
vec3(0.,0.,1.), // 下面
vec3(1.,1.,0.), // 上面
vec3(1.,1.,0.), // 上面
vec3(1.,0.,1.), // 左面
vec3(1.,0.,1.), // 左面
vec3(0.,1.,1.), // 右面
vec3(0.,1.,1.)  // 右面
);

float zBuffer = 90.;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (2.* fragCoord - iResolution.xy)/iResolution.y; // 坐标点变换到[-1,1]
    uv*=5.0; // 坐标点变换到 [-5,5]
    vec3 color = vec3(0.);

    vec3 verticesCube[8];
    float angle = TWO_PI/32.;
    for(int i=0;i<8;i++)
    {
        //设置顶点坐标.并将顶点坐标沿着x,y,z轴进行旋转
        verticesCube[i] =  vertices[i] * rotateX(angle) * rotateY(angle) *rotateZ(angle);

        float size = 1.0;
        verticesCube[i] = verticesCube[i] *  scaleXYZ(vec3(size)); // 对顶点进行缩放
        // 这里为何会需要将z轴 加或减 某个值呢
        verticesCube[i].z -= DISTCAMERA;


    }


    for(int i=0;i<12;i++)
    {
        vec3 coordTri[3];
        coordTri[0]= vec3(verticesCube[triOrderA[i]].xy,0.);
        coordTri[1]= vec3(verticesCube[triOrderB[i]].xy,0.);
        coordTri[2]= vec3(verticesCube[triOrderC[i]].xy,0.);

        //ZBUFFER
        vec3 moypos = zFix(
        vec3(uv,0.),
        verticesCube[triOrderA[i]],
        verticesCube[triOrderB[i]],
        verticesCube[triOrderC[i]]);


        float dist = distance(vec3(0.,0.,0.),moypos);


        if(inTriangle(uv,coordTri)){
            if(dist <= zBuffer){
                zBuffer = dist;
                color = triCol[i];
            }
        }
    }

    fragColor = vec4(color,1.0);

}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st= (st)*500.0;
    mainImage(gl_FragColor,st);
}
