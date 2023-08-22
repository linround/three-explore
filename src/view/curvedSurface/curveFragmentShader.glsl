uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


void renderCurve(in vec2 st){
    vec3 color = vec3(st,0.);
    gl_FragColor = vec4(color,1.0);
}


void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0)-1.0;
    renderCurve(st);
}
