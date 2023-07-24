uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;
#define PI 3.1415926




float plot(vec2 st,float res){
    return smoothstep(res-0.01,res,st.y) - smoothstep(res,res+0.01,st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    // 这是准备绘制的曲线
//    float y = step(0.5,st.x);

//    这里的y 相当于 在区间 [0.1, 0.9] 使用了一个函数计算值
//    float y = smoothstep(0.1,0.9,st.x);
//    float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);

    // 这是一个sin函数
    float y  = (1.0+sin((st.x*PI*2.0)+iTime))/2.0;

//    取得sin函数的绝对值
//    float y = fract(sin((st.x*PI*2.0)+iTime));

//    生成数字波
//    float y = ceil(sin((st.x*PI*2.0)));
//    float y = floor(sin((st.x*PI*2.0)))+1.0;
//    y = mod(st.x*2.0,0.5);
//    y = fract(st.x);



//    脉冲信号
//    float x = st.x;
//    float h = 10.0*x;
//    y= h*exp(1.0-h);


    vec3 color = vec3(y);
    float pct = plot(st,y);

    color = (1.0-pct)*color + (pct) * vec3(0.0,0.0,1.0);

    gl_FragColor=vec4(color,1.0);
}
