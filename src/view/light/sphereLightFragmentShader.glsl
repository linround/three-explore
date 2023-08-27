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


vec3 getSphereMaterial(in vec3 point){
    const vec3 material1 = vec3(1.0,0.,0.);
    const vec3 material2 = vec3(0.5,0.5,0.5);
    const vec3 material3 = vec3(0.0,1.0,0.0);
    const vec3 material4 = vec3(0.0,0.0,1.0);
    if(point.x>0.&& point.y>0.){
        return material1;
    } else if(point.x<=0. && point.y>0.){
        return material2;
    } else if(point.x<=0. && point.y<=0.){
        return material3;
    }
    return material4;
}






// 定义基本光照模型相关参数


const vec3 ambientLight = vec3(0.0); // 定义环境光
const vec3 light = vec3(1.0); // 定义点光源强度
const vec3 lightPos = vec3(0.,0.,5.); // 定义点光源的位置
const vec3 viewPos = vec3(0.,0.,5.); // 观察点
const float ks = 0.6;// 镜面反射参数 根据材质决定反射能量的大小
float specularEx = 20.;// 镜面反射参数：光滑表面的值较大，理想反射器的值时无限的（决定镜面光斑的大小，可提高视觉效果）

vec3  getDiffuse(in vec3 point,in vec3 kd){
    vec3 normal = normalize(point);// 该球表面点的法向量
    vec3 ambientDiffuse = kd*ambientLight;// 环境光对漫反射的贡献
    vec3 lightDir = normalize(lightPos-point);// 光源的方向：由表面顶点指向光源
    vec3 lightDiffuse = kd*light*max(dot(normal,lightDir),0.0); // 点光源对漫反射的贡献

    return lightDiffuse + ambientDiffuse;
}

vec3 getSpecular(in vec3 point){
    vec3 normal = normalize(point);// 该球表面的法向量
    vec3 lightDir = normalize(lightPos-point); // 光源方向：由表面顶点指向光源
    vec3 viewDir = normalize(viewPos - point); // 观察方向，注意要归一化，这样才能计算对应的余弦值

    vec3 lightReflect = reflect(-lightDir,normal); // 反射:由表面点发出
    vec3 lightSpecular = ks*light*pow(max(dot(lightReflect,viewDir),0.0),specularEx); // 镜面反射值

    return lightSpecular;

}


vec3 roateVertex(in vec3 vertex){

    mat4 roate = roateMat(vec3(1.),iTime);
    return (roate*vec4(vertex,0.)).xyz;
}



vec3 makeNormalModel(in vec2 st){
    st.x+=1.0;
    vec3 bgColor = vec3(0.);
    vec3 color;
    float len = length(st);
    float r = 1.0;// 球体半径
    if(len<=1.0){
        float z = sqrt(r*r - len*len);
        vec3 sphereVertex = vec3(st,z);
        vec3 vertexMaterilal= getSphereMaterial(sphereVertex);// 得到该顶点对应的材质
        vec3 diffuse = getDiffuse(sphereVertex,vertexMaterilal); // 得到该材质产生的漫反射
        vec3 specular = getSpecular(sphereVertex); // 得到该材质的镜面反射
        color = diffuse + specular;// 最终产生的结果时漫反射和镜面反射之和
    }
    color = mix(bgColor,color,1.);
    return color;
}


vec3 getBlinnPhongSpecular(in vec3 point){
    vec3 normal = normalize(point);// 该球表面的法向量
    vec3 lightDir = normalize(lightPos-point); // 光源方向：由表面顶点指向光源
    vec3 viewDir = normalize(viewPos - point); // 观察方向，注意要归一化，这样才能计算对应的余弦值

    vec3 hDir = normalize(lightDir+viewDir); // 求得半角向量

    vec3 lightSpecular = ks*light*pow(max(dot(hDir,normal),0.0),specularEx); // 镜面反射值

    return lightSpecular;
}
vec3 makeBlinnPhongModel(in vec2 st) {
    st.x-=1.0;
    vec3 bgColor = vec3(0.);
    vec3 color;
    vec3 centerA = vec3(-1,0,0);
    float len = length(st);
    float r = 1.0;// 球体半径
    if(len<=1.0){
        float z = sqrt(r*r - len*len);
        vec3 sphereVertex = vec3(st,z);
        vec3 vertexMaterilal= getSphereMaterial(sphereVertex);// 得到该顶点对应的材质
        vec3 diffuse = getDiffuse(sphereVertex,vertexMaterilal); // 得到该材质产生的漫反射
        vec3 specular = getBlinnPhongSpecular(sphereVertex); // 得到该材质的镜面反射
        color = diffuse + specular;// 最终产生的结果时漫反射和镜面反射之和
    }
    color = mix(bgColor,color,1.);
    return color;
}
vec3 renderSphere(in vec2 st){
    vec3 bgColor = vec3(0.);

    vec3 color = makeNormalModel(st);
    color+=makeBlinnPhongModel(st);
    color = mix(bgColor,color,1.);
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*4.0)-2.;
    vec3 color =  renderSphere(st);
    gl_FragColor = vec4(color,1.0);
}
