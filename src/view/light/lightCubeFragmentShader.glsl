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

vec3 projectPoint = vec3(0,0,25);
vec3 viewPlane = vec3(0,0,10);
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

vec2 pointPerspective(in vec3 point){
    float aspect = (viewPlane.z-projectPoint.z)/(point.z-projectPoint.z);
    float x = aspect*(point.x-projectPoint.x)+projectPoint.x;
    float y = aspect*(point.y-projectPoint.x)+projectPoint.y;
    return vec2(x,y);
}

// 依次定义 前前后后 左左右右 上上下下 12个三角形
int triangleVertexA[12] = int[12](0,0,4,4, 1,1,0,0, 7,7,1,1);
int triangleVertexB[12] = int[12](1,2,6,7, 5,6,7,3, 2,3,4,0);
int triangleVertexC[12] = int[12](2,3,5,6, 6,2,4,7, 6,2,5,4);
// 定义每个三角形的颜色
vec3[12] triangleColor = vec3[12](
    vec3(1,1,1),
    vec3(0,1,1),
    vec3(1,0,0),
    vec3(1,1,0),

    vec3(1,0,0),
    vec3(1,1,0),
    vec3(0,1,0),
    vec3(1,1,0),

    vec3(1,0,1),
    vec3(0,0,1),
    vec3(0,0,1),
    vec3(0,1,1)
);

// 对三角形进行投影
vec3[3] projectTriangle(vec3[3] triangle){
    vec2 A = pointPerspective(triangle[0]);
    vec2 B = pointPerspective(triangle[1]);
    vec2 C = pointPerspective(triangle[2]);
    return vec3[3](
        vec3(A,viewPlane.z),
        vec3(B,viewPlane.z),
        vec3(C,viewPlane.z)
    );
}


bool sameSide(in vec2 uv,in vec3 A,in vec3 B,in vec3 C){
    vec3 p = vec3(uv,viewPlane.z);
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
    float z = -(normal.x*x+normal.y*y+d)/normal.z;

    return vec3(x,y,z);
}

vec3 getTriangleGravity(in vec3[3] triangle){
    float x = (triangle[0].x+triangle[0].x+triangle[0].x)/3.;
    float y = (triangle[0].y+triangle[0].y+triangle[0].y)/3.;
    float z = (triangle[0].z+triangle[0].z+triangle[0].z)/3.;
    return vec3(x,y,z);
}
vec3 getPointLightColor(in vec3[3] triangle,in vec3 triangleColor){
    vec3 ambientLight = vec3(0.2); // 环境光颜色（强度）
    vec3 light = vec3(1.0); // 点光源颜色（强度）
    vec3 lightPos = vec3(0,0,25);// 点光源的位置

//    mat4 roate = roateMat(vec3(0,1,0),iTime*PI/2.);
//    lightPos = (roate*vec4(lightPos,0.0)).xyz;

    // 材质相关
    float matSpec = 8.0;// 光滑程度（与镜面反射相关）
    vec3 matColor = triangleColor;// 材质本身的颜色


    vec3 A = triangle[0];
    vec3 B = triangle[1];
    vec3 C = triangle[2];
    vec3 normal = cross(B-A,C-A);// 三角形表面的法向量
    vec3 point = getTriangleGravity(triangle);// 使用三角形的重心代表点，便于表示该三角形与点光源的方向

    vec3 lightDir = normalize(lightPos-point);

    // 计算环境光 材质*光线颜色
    vec3 ambient = matColor*ambientLight;
    // 计算漫反射
    vec3 diffuse = matColor*light*max(dot(normal,lightDir),0.0);
    // 计算镜面反射
    vec3 view = normalize(projectPoint - point);// 观察方向
    vec3 reflectDir = normalize(reflect(-lightDir,normal));// 反射矢量
    float ks = 0.3;// 材质高光反射系数
    vec3 specular = ks*light*pow(max(0.0,dot(view,reflectDir)),matSpec);

    return ambient + diffuse + specular;
}

vec3 renderTriangle(in vec2 st ){
    vec3 color = vec3(0.0);

    mat4 roate = roateMat(vec3(1,1,1),iTime*PI/5.);
    for(int i=0;i<8;i++){
        cube[i] = (roate*vec4(cube[i],0.0)).xyz ;
    }



    float deepth = -100.;
    for(int i =0;i<12;i++){
        vec3[3] triangle;
        // 得到三角形的三个顶点坐标
        triangle[0] = cube[triangleVertexA[i]];
        triangle[1] = cube[triangleVertexB[i]];
        triangle[2] = cube[triangleVertexC[i]];

        vec3[3] targetTriangle = projectTriangle(triangle);
        if(inSide(st,targetTriangle)){
            float aspect = getAspect(triangle[0],targetTriangle[0]);
            vec3 point = zFix(
                vec3(st,viewPlane.z),
                triangle[0],
                triangle[1],
                triangle[2],
                aspect
            );
            float z = point.z;
            if(z>=deepth){
                deepth = z;
                color = getPointLightColor(triangle,triangleColor[i]);
            }
        }

    }

    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0)-1.0;
    vec3 color = renderTriangle(st);
    gl_FragColor = vec4(color,1.0);
}
