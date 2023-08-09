uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




/*
Drawing on an oscilloscope in XY mode using stereo sound.
Screenshot of the sound on a basic XY scope simulator: http://i.imgur.com/SxskO1E.png

Music using the same technique by Jerobeam Fenderson: https://www.youtube.com/user/jerobeamfenderson1

Some XY oscilloscope demos:
Youscope - https://youtu.be/s1eNjUgaB-g
Oscillofun - https://youtu.be/o4YyI6_y6kw
Beams of Light - https://youtu.be/lVdWxKZVYC0
*/

//Preview of the shape being drawn. (may fall out of sync with the sound when paused)



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
    vec3 Zprp = vec3(0.0,0.0,3.0);
    vec3 Zvp = vec3(0.0,0.0,2.0);
    float u = (Zvp.z - p0.z)/(Zprp.z-p0.z);
    //  计算投影方向
//    1.计算投影点和 观察点的向量
//    2.计算在投影平面上的投影比例
//    3.此时利用相似三角形的性质，进行比例计算。得到新的位于投影平面上的坐标点
    float x = p0.x*(Zprp.z-Zvp.z)/(Zprp.z-p0.z)+Zprp.x*u;
    float y = p0.y*(Zprp.z-Zvp.z)/(Zprp.z-p0.z)+Zprp.y*u;

    return vec2(x,y);
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

    vec3 c0 = vec3(c + (u.x*u.x) * (1.0-c), (u.y*u.x) * (1.0-c) + (u.z*s), (u.z*u.x) * (1.0-c) - (u.y*s));
    vec3 c1 = vec3((u.x*u.y) * (1.0-c) - (u.z*s), c + (u.y*u.y) * (1.0-c), (u.z*u.y) * (1.0-c) + (u.x*s));
    vec3 c2 = vec3((u.x*u.z) * (1.0-c) + (u.y*s), (u.y*u.z) * (1.0-c) - (u.x*s), c + (u.z*u.z) * (1.0-c));


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

//Projected line
// 传入三维空间中的两个点坐标  和 一个投影平面
float Line3d(vec3 p0,vec3 p1,vec2 uv)
{
//    对p0点进行旋转和缩放 得到新的p0点
    p0 = (gModel*vec4(p0,1.0)).xyz;
//    对p1点进行旋转和缩放 得到新的p1点
    p1 = (gModel*vec4(p1,1.0)).xyz;


//    对缩放和旋转后的点进行投影
    p0.xy = Project(p0);
//    p0.xy = vec2(0.8);
    p1.xy = Project(p1);

//    得到投影后的 线段单位向量
    vec2 dir = normalize(p1.xy - p0.xy);
//    当前坐标 减去 起始点投影的坐标点   *  一个旋转矩阵
    uv = (uv - p0.xy) * mat2(
    dir.x, dir.y,
    -dir.y, dir.x
    );

//     clamp(x,min,max)  该函数是取一个中间值
    float d = distance(uv, clamp(uv, vec2(0.0), vec2(distance(p0.xy, p1.xy), 0.0)));

    return smoothstep(4.0/iResolution.y, 0.0, d);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
//    平面坐标映射
    vec2 uv = ((fragCoord.xy / iResolution.xy)-0.50)*2.0;
//    将空间映射到[-3,3]
    uv *= 3.0;

    float time = iTime;

//    单位矩阵乘以 缩放矩阵 再乘以旋转矩阵
//    I*S*R
//    gModel *= Scale(vec3(0.5));
//    对gModel 进行了旋转  如果旋转了0° 在使用x,y,z 任意一个轴点进行观察时 都是一样的，结果看起来类似一个平面图形


//    以下定义了一个沿着y轴旋转  一定角度 的矩阵  ；所以 当沿着 x轴或z轴 进行观察投影时，可以看到一个相对立体的结果
    gModel *= Rotate(vec3(0, 1, 0), 1.*PI/6.0);


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
