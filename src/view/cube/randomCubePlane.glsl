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


// 点的正交投影
vec2 pointOrthographic(in vec3 point){
    return vec2(point.x,point.y);
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
    vec3(0,1,1), // 下
    vec3(0,1,1), // 下

    vec3(1,0,0), // 左
    vec3(1,0,0), // 左
    vec3(1,0,1), // 右
    vec3(1,0,1)  // 右
);


bool sameSide(in vec2 uv,in vec3 A,in vec3 B,in vec3 C){
    vec3 p = vec3(uv,0.0);
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
    vec3 triangle[3];

    mat4 roate = roateMat(vec3(1,0,0),PI/2.0);
    float size = 2.0;
    for(int i=0;i<8;i++){
        vertexCubes[i] =(roate*vec4(vertexCubes[i],0.0)).xyz;
    }




    for(int i=0;i<6;i++){
        // 获取三角形的三个顶点

        triangle[0] = vertexCubes[triangleVertexA[i]];
        triangle[1] = vertexCubes[triangleVertexB[i]];
        triangle[2] = vertexCubes[triangleVertexC[i]];
        triangle = projectVertex(triangle); // 对坐标点进行投影

        // 投影后判断坐标点是否在当前三角形内部
        if(inSide(triangle,st)){
            color = triangleColor[i];
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
