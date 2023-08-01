uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


float random (in float x) {
    return fract(sin(x)*1e4);
}
float plot(in float v,in float s){
    return smoothstep(v-0.05,v,s)-smoothstep(v,v+0.05,s);
}

void fog(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 lineColor = vec3(1.0,1.0,0.0);
    st.x = st.x*TWO_PI*2.0;
    st.y = (st.y-0.5)*4.0;

    float amplitude = 1.0;
    float frequency = 1.0;


    float x = st.x;
    float y = sin(x*frequency);
    float t = 0.01*(-iTime*130.0);
    y+= sin(x*frequency*2.1+t)*4.5;
    y+= sin(x*frequency*1.72+t*1.21)*4.0;
    y+= sin(x*frequency*2.221+t*0.437)*5.0;
    y+= sin(x*frequency*3.1122+t*4.269)*2.5;
    y*=amplitude*0.06;

    float pct = plot(y,st.y);

    color = mix(color,lineColor,pct);



    gl_FragColor = vec4(color,1.0);
}

void main() {

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    fog(st);

}
