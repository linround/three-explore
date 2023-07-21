
// 精度越低，渲染的越快，但是质量会越差
#ifdef GL_ES
precision lowp float;
#endif
uniform vec3 iResolution;
uniform float iTime;
// 使用宏定义全局变量；
#define COLOR 1,0.0,1.0,1.0



vec4 red(){
    return vec4(1.0,0.,0.,1.);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    fragColor = vec4(COLOR);
}

// 这个是顶点着色其传递的 uv 坐标

varying vec2 vUv;
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
