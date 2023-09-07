uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




vec3 renderCurvePlane( in vec2 st){
    vec3 color = vec3(st.x,st.y,0.5);
    return color;
}
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color = renderCurvePlane(st);
    gl_FragColor = vec4(color,1.);
}
