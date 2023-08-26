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

void renderCircle(in vec2 st){
    float r = 0.5;
    vec2 center = vec2(0.0);
    vec3 color = vec3(0.0);
    float len = length(st-center);
    color = vec3(r-len);
    gl_FragColor = vec4(color,1.0);
}
void renderLight(in vec2 st){
    vec3 color = vec3(1.,0.,0.);
    gl_FragColor =vec4(color,1.0);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = 2.0*(fragCoord/iResolution.xy - vec2(0.5, 0.5)); // [-1,1]
    uv.x *= iResolution.x/iResolution.y;
    mat4 roate = roateMat(
        vec3(1.,0.,0.),
        iTime
    );

    // 光线颜色
    vec3 AMBIENT_COL = vec3(0.0);
    vec3 LIGHT_COL = vec3(1.);

    // 材质
    float MAT_SPEC = 40.; // 高光的平滑度(光泽度) 缩小光斑范围
    vec3 MAT_COL = vec3(1.0, 0.0, 0.0); // Blue #333fff
    vec3 MAT_COL_2 = vec3(1.0, 1.0, 1.0); // Aqua #339999

    float RADIUS = 0.5;

    vec3 cameraPos = vec3(0.0, 0.0, 5.0);
    vec3 lightPos = vec3(0.,0.,5.);

    if (length(uv) <= RADIUS) {
        // x^2 + y^2 + z^2 = R^2
        float z = sqrt(RADIUS*RADIUS - uv.x*uv.x - uv.y*uv.y);

        vec3 p = vec3(uv, z);
        vec3 normal = normalize(p);
        vec3 lightDir = normalize(lightPos - p);

        // 材质
        vec3 m = MAT_COL;
        if (p.y <= 0.0 && p.y >= -RADIUS) {
            m = MAT_COL_2;
        }

        // 环境光
        // m 表示物体表面环境光反射系数，用于调整环境光对物体表面的影响
        // AMBIENT_COL 表示环境光的强度，即颜色值，通常是一个常数
        vec3 ambient = m*AMBIENT_COL;

        // 漫反射
        // m 表示物体表面的漫反射系数,用于调整漫反射光对物体表面的影响（如果是使用贴图，就用贴图颜色作为漫反射系数）

        // LIGHT_COL 表示定向光源的强度，即颜色数值
        // dot(normal,lightDir) 表示物体表面法向量normal和光线入射方向向量lightDir的点积
        // normal 法线方向
        // lightDir 光线方向
        vec3 diffuse = m *LIGHT_COL * max(dot(normal, lightDir),0.0);





        // 镜面反射 （高光）
        // 产生的原因
        // 物体表面过于光滑，对光的反射很强
        // 当光线照射到物体表面后会被反射出来。
        // 如果此时看向的方向正好与反射的光线方向很接近，就会看到一个明显的光斑，这个光斑就是我们所说的高光。
        vec3 view = normalize(cameraPos - p);
        // 计算反射矢量
        vec3 reflectDir = normalize(reflect(-lightDir, normal));
        // 这里需要理解一个现象
        // 光泽度越大，光斑就越小

        // 假设光源位置与观察位置的坐标一样；
        // dot(reflectDir,view)   = |reflectDir||view|*cosΘ；
        // 当越靠近入射点时 反射向量与 观察方向之间的夹角越小；
        // cosθ的值越接近 1 ；此时反射光的值越大，所以越靠近入射点，高光效果越大；
        // 随着 向周围坐标扩散，方向的变化速率也越来越大，所以 高光变小的速率也越来越大；
        // 所以在较为平缓的 坐标范围中，该区域形成了一个光斑；
        // 比如之前时 1-x²
        // 随着 x 变大 变化速率上升的越快
        //


        // 注意 变化速率 尽量使用整数，不要验证[0-1]范围内的变化速率，这一块的相差都不大
        // 变化速率绝对值 [0,8] 的区域形成光斑内圈
        // 对于1-x²。变化速率为-2x，当x为[0,4] 形成光斑内圈
        // 对于1-x³。变化速率-3x²，当x为[0，1.6] 形成光斑内圈


        vec3 specular = 0.3*pow(max(dot(reflectDir, view), 0.0), MAT_SPEC)*LIGHT_COL;
        // ks 材质高光反射系数 为0.3
        // LIGHT_COL 高光强度和颜色值
        float ks = 0.3;
        specular = ks * LIGHT_COL * max(0.0,dot(view,reflectDir));

        specular = ks*LIGHT_COL * pow(max(0.0,dot(view,reflectDir)),MAT_SPEC);

        // 关于blinn-phong模型
        // 高光是因为反射的光线与观测方向很接近
        // 因此计算高光之前需要先计算反射的方向
        // 前面计算反射的方向比较复杂
        // 使用blinn-phong模型 只需要计算光线方向与观测方向的半程向量是否与法向量足够接近即可

        // h半程向量
        vec3 h = normalize(lightDir+view);
        specular = ks*LIGHT_COL*pow(max(0.0,dot(normal,h)),MAT_SPEC);

        fragColor = vec4((ambient) + diffuse + specular, 1.0);
    } else {
        fragColor = vec4(0.7,0.7,0.72,1.0);
    }
}
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0)-1.0;
//     renderLight(st);
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
