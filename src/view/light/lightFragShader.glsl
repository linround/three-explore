uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718

void renderLight(){
    vec3 color = vec3(1.,0.,0.);
    gl_FragColor =vec4(color,1.0);
}

void main() {
    renderLight();
}
