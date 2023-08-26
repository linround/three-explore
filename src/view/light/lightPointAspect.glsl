uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


float cosN(in vec2 st){
    float x = st.x;
    float angle = x*PI/2.;
    float v = abs(2.*cos(angle)*sin(angle));
    return smoothstep(v+0.1,v,st.y) - smoothstep(v,v-0.1,st.y);
}

float cosS(in vec2 st){
    float x = st.x;
    float angle = x*PI/2.;
    float v = abs(4.*pow(cos(angle),3.)*sin(angle));
    return smoothstep(v+0.1,v,st.y) - smoothstep(v,v-0.1,st.y);
}

void main() {

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st.y*=2.;
    vec3 lineColor = vec3(1.0);
    vec3 bgColor = vec3(0.0);
    vec3 color;

    // 红线是cosθ 平方的导数
    vec3 c2 = vec3(1.,0.,0.);
    float n2 = cosN(st);
    color = mix(bgColor,c2,n2);


    // 蓝线是cosθ 四次方的导数
    vec3 c3 = vec3(0.,0.,1.);
    float n3=cosS(st);
    color = mix(color,c3,n3);

    // 对比红线 蓝线
    // 随着次方的增大 要想变化率 都大于1/2
    // 次方数越大， 需要的x变化范围越小
    // 说明了 次方数越大，光斑会更加的集中


    gl_FragColor =vec4(color,1.0);
}
