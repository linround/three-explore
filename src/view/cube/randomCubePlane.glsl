uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718

const vec3 projectPoint = vec3(0.,0.,100.);
const vec3 viewPlane = vec3(0.,0.,5.);


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


// 点的正交投影
vec2 pointOrthographic(in vec3 point){
    return vec2(point.x,point.y);
}

// 计算投影缩放后的比例
// s 是投影前的三维空间坐标
// t 是投影后的三维空间坐标
// 计算得到 投影后/投影前 的比例
float getAspect(in vec3 s,in vec3 t){
    float aspect = (t.x-projectPoint.x)/(s.x-projectPoint.x);
    return aspect;
}

// A B C 是未投影平面中不共线的三个顶点
// 求一个面上某个点的坐标
vec3 zFix(in vec3 point,in vec3 A,in vec3 B,in vec3 C,in float aspect){
    // 平面中的两个向量
    vec3 v0 = B-A;
    vec3 v1 = C-A;
    // 求两个向量构成的平面的法向量
    vec3 normal = cross(v1,v0);
    float d = -normal.x*A.x-normal.y*A.y-normal.z*A.z;
    float x = projectPoint.x + (point.x-projectPoint.x)*aspect;
    float y = projectPoint.y + (point.y-projectPoint.y)*aspect;
    float z = (normal.x*x+normal.y*y+d)/normal.z;

    return vec3(x,y,z);
}


// 点的透视投影
// 这里不考虑斜切的情况
vec2 pointPerspective(vec3 point){

    // 利用相似三角形原理
    float aspect = (viewPlane.z - projectPoint.z)/(point.z-projectPoint.z);
    float x = aspect * (point.x-projectPoint.x)+projectPoint.x;
    float y = aspect * (point.y-projectPoint.y)+projectPoint.y;
    return vec2(x,y);
}


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

// 定义三角形顶点
// 依次定义 前后 上下 左右
int triangleVertexA[12] = int[](2,3,0,0,   0,0,4,4,   1,1,0,0);
int triangleVertexB[12] = int[](3,7,1,6,   1,2,5,6,   2,7,3,5);
int triangleVertexC[12] = int[](7,4,6,5,   2,3,6,7,   7,6,4,4);
// 定义每个三角形的颜色
vec3 triangleColor[12] = vec3[](
    vec3(1,1,1), // 前
    vec3(0,1,0), // 前
    vec3(0,0,1), // 后
    vec3(1,0,1), // 后

    vec3(1,0,1), // 上
    vec3(0,1,0), // 上
    vec3(1,1,0), // 下
    vec3(1,0,0), // 下

    vec3(1,0,0), // 左
    vec3(1,1,0), // 左
    vec3(1,0,1), // 右
    vec3(0,0,1)  // 右
);


bool sameSide(in vec2 uv,in vec3 A,in vec3 B,in vec3 C){
    vec3 p = vec3(uv,0.0);
    // 以A为起点 AB为某一边
    // AC和Ap 分别与AB 边进行叉乘
    // 最终根据两者的叉乘结果 来判断 点p 和 点C 是否在AB边的同一侧
    vec3 side = B-A;
    vec3 n1 = cross(side,C-A);
    vec3 n2 = cross(side,p-A);
    if(dot(n1,n2)>=0.){
        return true;
    }
    return false;

}
bool inSide(vec3 triangleVertex[3],in vec2 uv){

    if(
    sameSide(uv,triangleVertex[0],triangleVertex[1],triangleVertex[2]) &&
    sameSide(uv,triangleVertex[1],triangleVertex[2],triangleVertex[0]) &&
    sameSide(uv,triangleVertex[2],triangleVertex[0],triangleVertex[1])
    ){ return true; }

    return false;
}
vec3[3] projectVertex(in vec3 triangle[3]){
    vec2 A = pointPerspective(triangle[0]);
    vec2 B = pointPerspective(triangle[1]);
    vec2 C = pointPerspective(triangle[2]);
    return vec3[3](
    vec3(A,0.0),
    vec3(B,0.0),
    vec3(C,0.0)
    );
}


vec3 renderTriangle(in vec2 st ){
    vec3 color = vec3(0.0);
    vec3 sourceTriangle[3];

    mat4 roate = roateMat(vec3(1,1,0),iTime*PI/4.0);
    float size = 2.0;
    for(int i=0;i<8;i++){
        vertexCubes[i] =(roate*vec4(vertexCubes[i],0.0)).xyz;
    }
    float deepth = -100.;
    for(int i=0;i<12;i++){
        // 获取三角形的三个顶点

        sourceTriangle[0] = vertexCubes[triangleVertexA[i]];
        sourceTriangle[1] = vertexCubes[triangleVertexB[i]];
        sourceTriangle[2] = vertexCubes[triangleVertexC[i]];
        vec3[3] targetTriangle = projectVertex(sourceTriangle); // 对坐标点进行投影

        // 投影后判断坐标点是否在当前三角形内部
        if(inSide(targetTriangle,st)){
            float aspect = getAspect(sourceTriangle[0],targetTriangle[0]);
            vec3 point = zFix(
                vec3(st,viewPlane.z),
                sourceTriangle[0],
                sourceTriangle[1],
                sourceTriangle[2],
                aspect
            );
            float z = point.z;
            if(z>deepth){
                deepth = z;
                color = triangleColor[i];
            }
        }
    }

    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    // 将范围转换为[-1,1]
    st = (st*2.0)-1.0;
    // 将范围转换为[-10,10]
    st*=2.0;
    vec3 color = renderTriangle(st);
    gl_FragColor = vec4(color,1.0);
}
