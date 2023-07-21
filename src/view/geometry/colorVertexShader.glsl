varying vec2 vUv;

void main() {
    // 三维空间坐标外，还具有 uv坐标
    // 在这里将该顶点的uv坐标传递到全局变量vUv,在块着色器中接受该顶点的uv坐标
    vUv = uv;
    // 投影矩阵*模型视图矩阵*顶点坐标
    // projectionMatrix和modelViewMatrix 这两个矩阵是由threejs 提供
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
