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
vec2 Project(vec3 p0)
{
    vec3 vanish = vec3(2.0,0.0,0.0);

    p0 -= vanish;

    return length(vanish) / p0.x * p0.yz;
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
//    p0点被缩放
    p0 = (vec4(p0,1.0) * gModel).xyz;
    p1 = (vec4(p1,1.0) * gModel).xyz;

    p0.xy = Project(p0);
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
//    平面坐标
    vec2 uv = ((fragCoord.xy / iResolution.xy)-0.50)*2.0;
    uv *= 2.0;

    float time = iTime;

//    gModel *= Scale(vec3(0.5));
//    这里是对模型进行 以z轴为旋转轴 进行旋转
    gModel *= Rotate(vec3(0, 0, 1), iTime);

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

//    下面
    cout += Line3d(cube[0],cube[1], uv);
    cout += Line3d(cube[1],cube[3], uv);
    cout += Line3d(cube[3],cube[2], uv);
    cout += Line3d(cube[2],cube[0], uv);

//    上面
    cout += Line3d(cube[4],cube[5], uv);
    cout += Line3d(cube[5],cube[7], uv);
    cout += Line3d(cube[7],cube[6], uv);
    cout += Line3d(cube[6],cube[4], uv);

//   侧面
    cout += Line3d(cube[0],cube[4], uv);
    cout += Line3d(cube[5],cube[1], uv);
    cout += Line3d(cube[2],cube[6], uv);
    cout += Line3d(cube[7],cube[3], uv);

    cout *= vec3(1.0,1.0,1.0);

    fragColor = vec4(cout, 1.0);
}

void main(){
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
