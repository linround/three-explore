
// 精度越低，渲染的越快，但是质量会越差
#ifdef GL_ES
precision lowp float;
#endif
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
// 使用宏定义全局变量；
#define COLOR 1,0.0,1.0,1.0



vec4 red(){
    return vec4(1.0,0.,0.,1.);
}

// 根据鼠标位置修改颜色
void mouseColor(out vec4 fragColor,in vec2 fragCoord ){
    fragColor = vec4((iMouse/iResolution.xy),1.0,1.0);
}


// 根据像素坐标渲染对应坐标的动态颜色
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    float r = abs(sin(iTime));
    float g = abs(sin(iTime/2.0));
    float b = abs(sin(iTime/4.0));
    fragColor = vec4((fragCoord / iResolution.xy),0.0,1.0);
}

// 这个是顶点着色其传递的 uv 坐标

varying vec2 vUv;
void main() {
    mouseColor(gl_FragColor, gl_FragCoord.xy);
}
