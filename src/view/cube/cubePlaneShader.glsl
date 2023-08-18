uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define TWO_PI 6.28318530718
#define LINE

#define DISTCAMERA 10.
#define SIZE 0.25


//permet de fixer un point sur la surface d'un triangle (utile pour le zBuffer)
vec3 zFix(vec3 point, vec3 A, vec3 B,vec3 C)
{
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

float dist(vec3 A, vec3 B)
{
    vec3 pos = A-B;
    return sqrt(pos.x*pos.x+pos.y*pos.y+pos.z*pos.z);
}

//======================== POLYGONE ========================
bool sameside(vec2 uv, vec3 A, vec3 B, vec3 C) //permet d'indiquer de quel coté d'une ligne on se trouve (0 ou 1)
{
    vec3 u = vec3(uv.x,uv.y,0.0);
    vec3 valuexy = cross(B-A,C-A);
    vec3 valuexz = cross(B-A,u-A);

    if(dot(valuexy,valuexz)>=0.){return true;}
    else{return false;}
}

bool inTriangle(vec2 uv,vec3 v[3]) // permet d'indiquer si on se trouve bien a l'intérieur d'un triangle (3 ligne)
{
    if(sameside(uv,v[0],v[1],v[2]) && sameside(uv,v[1],v[2],v[0]) && sameside(uv,v[2],v[0],v[1])){return true;}
    else{return false;}

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
//======================== COORD CUBE ========================
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


const int triOrderA[12] = int[](0,1,4,5,0,1,2,3,0,2,1,3);
const int triOrderB[12] = int[](1,2,5,6,1,4,3,6,2,4,3,5);
const int triOrderC[12] = int[](2,3,6,7,4,5,6,7,4,6,5,7);

const vec3 triCol[12] = vec3[](
vec3(1.,0.,0.),
vec3(1.,0.,0.),
vec3(0.,1.,0.),
vec3(0.,1.,0.),
vec3(0.,0.,1.),
vec3(0.,0.,1.),
vec3(1.,1.,0.),
vec3(1.,1.,0.),
vec3(1.,0.,1.),
vec3(1.,0.,1.),
vec3(0.,1.,1.),
vec3(0.,1.,1.)
);

float zBuffer = 300000.;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // normalisation des pixel (from 0 to 1)
    vec2 uv = (2.* fragCoord - iResolution.xy)/iResolution.y;
    vec3 col = vec3(0.);

    vec3 verticesCube[8];
    for(int i=0;i<8;i++)
    {

//      设置顶点坐标.并将顶点坐标沿着x,y,z轴进行旋转
        verticesCube[i] =  vertices[i] * rotateX(iTime) * rotateY(iTime) *rotateZ(iTime);
//        verticesCube[i] =  vertices[i] * rotateX(iTime) ;
//        verticesCube[i] =  vertices[i] * rotateY(iTime) ;
//        verticesCube[i] =  vertices[i] * rotateZ(iTime) ;

//
        verticesCube[i] = verticesCube[i] *  scaleXYZ(vec3(SIZE,SIZE,SIZE));
        verticesCube[i].z += DISTCAMERA;

        //perspective pour la profondeur
//        float ooz = 1. / verticesCube[i].z;

//        verticesCube[i].x = ooz* verticesCube[i].x*2.;
//        verticesCube[i].y =  ooz * verticesCube[i].y*2.;

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
        float dist = dist(vec3(0.,0.,0.),moypos);
        if(inTriangle(uv,coordTri)){
            if(dist <= zBuffer){
                zBuffer = dist;
                col = triCol[i];
            }
        }
    }

    fragColor = vec4(col,1.0);

}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st= (st)*500.0;
    mainImage(gl_FragColor,st);
}
