uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


float box(in vec2 st, in vec2 size){

    float nx = 0.5-size.x/2.0;
    float px = 0.5+size.x/2.0;
    float x = smoothstep(nx,nx+0.001,st.x)-
    smoothstep(px,px+0.001, st.x);


    float ny = 0.5-size.y/2.0;
    float py = 0.5+size.y/2.0;
    float y = smoothstep(ny,ny+0.001,st.y)-
    smoothstep(py,py+0.001,st.y);
    return x*y;
}

float crossBox(in vec2 st,in vec2 size){
    float horizontal = box(st,size);
    float vertical = box(st,vec2(size.y,size.x));
    return vertical+horizontal;
}



void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec2 translate = vec2(sin(iTime),cos(iTime));
    st+=translate*0.3;

    vec3 boxColor = vec3(1.0,1.0,1.0);
    vec3 color = vec3(0.0);

    float pct = crossBox(st,vec2(0.3,0.05));
    color = mix(color,boxColor,pct);

    float pct2 = crossBox(st,vec2(0.1,0.2));
    color = mix(color,boxColor,pct2);


    gl_FragColor = vec4(color,1.0);
}
