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

float vRandom(in vec2 st){
    float vDot = dot(st.xy,vec2(12.9898,78.233));
    float vSin = sin(vDot)*43758.5453123;
    float vF = fract(vSin);
    return vF;
}

float noise(in vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);

    //    使用四个角随机生成点
    float a = vRandom(i);
    float b = vRandom(i+vec2(1.0,0.0));
    float c = vRandom(i+vec2(0.0,1.0));
    float d = vRandom(i+vec2(1.0,1.0));
    //  对小数进行平滑
    vec2 u = f*f*(3.0-2.0*f);

    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
void fog(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 lineColor = vec3(1.0,1.0,0.0);
    st.x = st.x*TWO_PI*2.0;
    st.y = (st.y-0.5)*8.0;

    float amplitude = 1.0;
    float frequency = 1.0;


    float x = st.x;
    float y = sin(x*frequency);
//    与时间函数结合生成一种动态的波
    float t = 0.01*(-iTime*130.0);
    y+= sin(x*frequency*2.1+t*0.2258);
    y+= sin(x*frequency*1.72+t*1.21);
    y+= sin(x*frequency*2.221+t*2.437);
    y+= sin(x*frequency*3.1122+t*3.269);
    y*=amplitude*0.6;

    float pct = plot(y,st.y);

    color = mix(color,lineColor,pct);



    gl_FragColor = vec4(color,1.0);
}



float fbm2(in vec2 st){
    const int octaves = 8;
    mat2 rot = mat2(cos(0.5), sin(0.5),
    -sin(0.5), cos(0.50));
    float value = 0.0;
    float amplitude = 0.5;
    vec2 offset = vec2(100.0);

    for(int i=0;i<octaves;i++){
        value+=amplitude*noise(st);
//        *3.0 是比较关键
        st = rot*st*4.0+offset;
        amplitude*=0.5;
    }

    return value;
}

// 总的方案利用fbm生成各种噪点
// 将原坐标 平移，生成新的动态坐标噪点
// 利用一个
void noiseWave(in vec2 st){
    st*=8.0;

    vec3 color = vec3(0.0,0.0,0.0);
//    设置一下y轴和x轴范围
    float v = fbm2(st);
    vec2 q = vec2(0.0,0.0);
    q.x = fbm2(st+0.0025*iTime);
    q.y = fbm2(st+0.0025*iTime+vec2(2.0,1.0));
    vec2 r = vec2(0.0);
    r.x = fbm2(st+q.x+0.15*iTime);
    r.y = fbm2(st+q.y+0.126*iTime+vec2(8.1,56));
    float v2 = fbm2(st+0.5*iTime+r);

    color = mix(vec3(0.101961,0.619608,0.666667),
    vec3(0.666667,0.666667,0.498039),
    clamp((v2*v)*4.0,0.0,1.0));


    color = mix(color,
    vec3(0.0,0.0,0.16),
    clamp(length(v),0.0,1.0));




    gl_FragColor=vec4(color,1.0);
}









#define OCTAVES 6
float fbm (in vec2 st){
    float value = 0.0;
    float amplitude = 0.5;


    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5),
    -sin(0.5), cos(0.50));

    for(int i=0;i<=OCTAVES;i++){
        value+=amplitude*noise(st);
        st=rot*st*2.0+shift;
        amplitude*=0.5;
    }
    return value;
}



void makeFog(in vec2 st){
    st*=6.0;
    vec3 color = vec3(0.0);
    vec2 q = vec2(0.0);
    q.x = fbm(st+0.0*iTime);
    q.y = fbm(st+vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(st+1.0*q+vec2(1.7,9.2)+0.15*iTime);
    r.y = fbm(st+1.0*q+vec2(8.3,2.8)+0.126*iTime);

    float f = fbm(st+r);

    color = mix(vec3(0.1,0.6,0.666),
    vec3(0.66,0.66,0.5),
    clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
    vec3(0.0,0.0,0.16),
    clamp(length(q),0.0,1.0));

    color = mix(color,
    vec3(0.66,1.0,1.0),
    clamp(length(r.x),0.0,1.0));

//    color = (f*f*f+0.6*f*f+0.5*f)*color;
    color = (f)*color;
    gl_FragColor = vec4(color,1.0);


}




void main() {

    vec2 st = gl_FragCoord.xy/iResolution.xy;
// 普通的叠加的波
    //    fog(st);
    makeFog(st);

//  对叠加过程稍做处理后的波
//    noiseWave(st);
}
