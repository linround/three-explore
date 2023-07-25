uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926



// sunset
void sunset(){

    float pX = (sin(iTime)+1.0)/2.0;
    float pY = (sin(iTime)+1.0)/2.0;

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec2 point = vec2(pX,pY);
    vec3 bgColor = vec3(0.0,0.0,0.0);
    vec3 sunColor = vec3(1.0,1.0,0.0);

    float dist = (0.50-distance(st,point))/2.0;

    vec3 color = bgColor + sunColor * dist;

    gl_FragColor = vec4(color,1.0);
}


vec3 rgb2hsb(in vec3 c){
    vec4 K = vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);

    vec4 p = mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));

    vec4 q = mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));

    float d = q.x - min(q.w,q.y);

    float e = 1.0e-10;

    vec3 color = vec3(abs(q.z+(q.w-q.y)/(6.0*d + e)),d/(q.x+e),q.x);
    return color;
}


void HSBMap(){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color = vec3(0.0);
    color = vec3(st.x,1.0,st.y);

    vec3 hsb = rgb2hsb(color);
    gl_FragColor = vec4(hsb,1.0);

}


void main() {
    // sunset();
    HSBMap();
}
