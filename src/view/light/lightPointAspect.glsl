uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718

varying vec3 c;


float cosN(in vec2 st){
    float x = st.x;
    float angle = x*PI/2.;
    float v = abs(2.*cos(angle)*sin(angle));
    return smoothstep(v+0.01,v,st.y) - smoothstep(v,v-0.01,st.y);
}

float cosS(in vec2 st){
    float x = st.x;
    float angle = x*PI/2.;
    float v = abs(4.*pow(cos(angle),3.)*sin(angle));
    return smoothstep(v+0.01,v,st.y) - smoothstep(v,v-0.01,st.y);
}


float cosV(in vec2 st,float n){
    float x = st.x;
    float angle = x*PI/2.;
    float v = pow(cos(angle),n);
    return smoothstep(v+0.01,v,st.y) - smoothstep(v,v-0.01,st.y);
}


vec3 renderBg(in vec2 st){
    float v = 1.-exp(-2.*st.x*st.x);
    vec3 color = vec3(v);
    return color;
}


// 能级划分
// 真实感的图像需要具备 32 至 256个强度等级
vec3 lightEnerge(in vec2 st ){
    float n = 8.0; // 划分8个能级
    float I0 = 1.0; // 初始能级
    float r = 1.0/2.0; // 相邻两个强度之间的比率
    st.x *= n;
    float v = I0*pow(r,ceil(st.x)/n);
    return vec3(1.-v);
}





void main() {

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st.y*=2.;
    vec3 lineColor = vec3(1.0);
    vec3 bgColor = lightEnerge(st);
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


    float v = cosV(st,8.);
    color = mix(color,lineColor,v);
    color = mix(color,c,0.6);




    gl_FragColor =vec4(color,1.0);
}
