uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718






// 这里定义的
mat4 gModel = mat4(
    1,0,0,0, //长 x
    0,1,0,0, // 宽 z
    0,0,1,0, // 高 y
    0,0,0,1);


//Single point projection
// 该假设 模型的坐标轴 和 实际空间坐标轴 重合时
//  比如从 y 方向观察 模型 对模型进行投影
vec2 Project(vec3 p0)
{

//    vec3 vanish = vec3(3.0,0.0,0.0);
//    //  计算投影方向
//    p0 -= vanish;
//
//    return length(vanish) / p0.x * p0.yz;


//    在z方向上进行观察
//    以下投影是在xy平面上
//  Zprp 是观察点，Zvp 是要投影的平面Z轴坐标，投影面距离观察点越近，投影结果就会越小
    vec3 Zprp = vec3(0.0,0.0,3.0); // 观察点的坐标
    vec3 Zvp = vec3(0.0,0.0,2); // 投影到的点的z轴坐标

    float u = (Zvp.z - Zprp.z)/(p0.z-Zprp.z);
    //  计算投影方向
//    1.计算投影点和 观察点的向量
//    2.计算在投影平面上的投影比例
//    3.此时利用相似三角形的性质，进行比例计算。得到新的位于投影平面上的坐标点
    float xvp = u*(p0.x-Zprp.x)+Zprp.x;
    float yvp = u*(p0.y-Zprp.y)+Zprp.y;

    return vec2(xvp,yvp);
}


//Angle-axis rotation

// 以u向量为轴，绕u向量旋转 角度 a
mat4 Rotate(vec3 u,float a)
{
    float c = cos(a);
    float s = sin(a);
//    在四元数的介绍中 2.1
//    https://krasjet.github.io/quaternion/quaternion.pdf
//    在进行任何计算之前需要将这个旋转轴u 转化为一个单位向量
    u = normalize(u);

    vec3 c0 = vec3((u.x*u.x) * (1.0-c) + c,       (u.y*u.x) * (1.0-c) + (u.z*s),   (u.z*u.x) * (1.0-c) - (u.y*s));
    vec3 c1 = vec3((u.x*u.y) * (1.0-c) - (u.z*s), c + (u.y*u.y) * (1.0-c),         (u.z*u.y) * (1.0-c) + (u.x*s));
    vec3 c2 = vec3((u.x*u.z) * (1.0-c) + (u.y*s), (u.y*u.z) * (1.0-c) - (u.x*s),   c + (u.z*u.z) * (1.0-c));


    // 也可以写作 mat4(mat3(c0,c1,c2));
    return mat4(
    vec4(c0,0.0),
    vec4(c1,0.0),
    vec4(c2,0.0),
    vec4(0.0,0.0,0.0,1.0));
}

mat4 Scale(vec3 v)
{
    return mat4(
    vec4(v.x,0,0,0),
    vec4(0,v.y,0,0),
    vec4(0,0,v.z,0),
    vec4(0,0,0,1));
}



float plotPoint(in vec2 center,in vec2 point){
    float dist = distance(center,point);
    return dist>0.01?0.0:1.0;
}


//Projected line
// 传入三维空间中的两个点坐标  和 一个投影平面
float Line3d(vec3 p0,vec3 p1,vec2 uv)
{
//    对p0点进行旋转和缩放 得到新的p0点
    p0 = (gModel*vec4(p0,1.0)).xyz;
//    对p1点进行旋转和缩放 得到新的p1点
    p1 = (gModel*vec4(p1,1.0)).xyz;


//    对缩放和旋转后的点进行投影，得到在投影平面上的坐标点
    p0.xy = Project(p0);
    p1.xy = Project(p1);

//    return plotPoint(p0.xy,uv.xy)+plotPoint(p1.xy,uv.xy);// 这里计算的是八个顶点的绘制情况

//    计算投影后的坐标项链==向量，并进行归一化
    vec2 dir = normalize(p1.xy - p0.xy);






    //    使用传统方式，已知两个点，确认高点是否在其连线上
    /*
    vec2 line = p1.xy-p0.xy;
    float k = line.y/line.x;
    float b = p1.y-k*p1.x;
    float y = k*uv.x+b;
    float dist = abs(y-uv.y);

    float startX = min(p1.x,p0.x)+0.01;
    float endX = max(p1.x,p0.x)+.01;
    if(uv.x<startX || uv.x>endX){
        return 0.0;
    }
    return smoothstep(0.010, 0.0, dist);
    */




//    关于如何判断某个点 是否是某条线上的
//    计算当前坐标 到p0点的向量
//    将当前向量旋转与 p0p1 方向相同的角度

//    这里将uv与p0之间形成的向量逆时针旋转θ度
    vec2 ruv = (uv.xy - p0.xy)*mat2(
        dir.x, dir.y,
        -dir.y, dir.x
    );

    float minx = clamp(ruv.x,0.0,distance(p0.xy,p1.xy));
//     clamp(x,min,max)  该函数是取一个中间值
//    首先取的p0p1投影在平面上的点的长度
    float d = distance(ruv, vec2(minx,0.0));

    return smoothstep(0.010, 0.0, d);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
//    平面坐标映射
    vec2 uv = ((fragCoord.xy / iResolution.xy)-0.50)*2.0;
//    将空间映射到[-3,3]
    uv *= 1.0;

    float time = iTime;

//    单位矩阵乘以 缩放矩阵 再乘以旋转矩阵
//    I*S*R
//    gModel *= Scale(vec3(0.5));
//    对gModel 进行了旋转  如果旋转了0° 在使用x,y,z 任意一个轴点进行观察时 都是一样的，结果看起来类似一个平面图形


//    以下定义了一个沿着y轴旋转  一定角度 的矩阵  ；所以 当沿着 x轴或z轴 进行观察投影时，可以看到一个相对立体的结果
    gModel *= Rotate(vec3(0, 1, 0), iTime*PI/6.0);


//    定义立方体八个顶点的坐标
    vec3 cube[8];
    cube[0] = vec3(-1,-1,-1);
    cube[1] = vec3( 1,-1,-1);
    cube[2] = vec3(-1, 1,-1);
    cube[3] = vec3( 1, 1,-1);
    cube[4] = vec3(-1,-1, 1);
    cube[5] = vec3( 1,-1, 1);
    cube[6] = vec3(-1, 1, 1);
    cube[7] = vec3( 1, 1, 1);

    vec3 cout = vec3(0);

//    下面 在空间中对点进行透视投影
    cout += Line3d(cube[0],cube[1], uv);
    cout += Line3d(cube[1],cube[3], uv);
    cout += Line3d(cube[3],cube[2], uv);
    cout += Line3d(cube[2],cube[0], uv);
//
////    上面
    cout += Line3d(cube[4],cube[5], uv);
    cout += Line3d(cube[5],cube[7], uv);
    cout += Line3d(cube[7],cube[6], uv);
    cout += Line3d(cube[6],cube[4], uv);
//
////   侧面
    cout += Line3d(cube[0],cube[4], uv);
    cout += Line3d(cube[5],cube[1], uv);
    cout += Line3d(cube[2],cube[6], uv);
    cout += Line3d(cube[7],cube[3], uv);

    cout *= vec3(1.0,1.0,0.0);

    fragColor = vec4(cout, 1.0);
}

void main(){
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
