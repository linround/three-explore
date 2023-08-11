uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


void mainImg(in vec2 st){
    vec3 color = vec3(st.x,st.y,1.0);
    gl_FragColor = vec4(color,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    mainImg(st);
}
