varying vec2 vUv;
uniform float iTime;
varying vec3 c;


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
void main() {

    mat4 roate = roateMat(vec3(0.,0.,1.),iTime);
    // 三维空间坐标外，还具有 uv坐标
    // 在这里将该顶点的uv坐标传递到全局变量vUv,在块着色器中接受该顶点的uv坐标
    vUv = uv;
    c = normalize(position);
    // 投影矩阵*模型视图矩阵*顶点坐标
    // 通常把表示顶点的位置数据的变量position赋值给gl_Postion;
    // projectionMatrix和modelViewMatrix 这两个矩阵是由threejs 提供
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    // gl_Position = roate*projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
