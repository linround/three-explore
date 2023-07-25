uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926



// 这里定义了多种颜色
// 验证了 swizzle(调配) 功能
void moreColor(){
    vec3 color = vec3(1.,0.,0.);

    vec3 yellow,magmenta,green;
    yellow.rg = vec2(1.0);
    magmenta = yellow.rbg;

    green.rgb = yellow.bgb;


    gl_FragColor = vec4(yellow,1.0);
}


vec3 colorA = vec3(0.0,0.0,0.0);
vec3 colorB = vec3(1.0,0.0,0.0);
// 在这里验证了 mix 函数
void mixColor(){

    vec3 color = vec3(0.0);
    float pct = abs(sin(iTime));
    color = mix(colorA,colorB,pct);
    gl_FragColor = vec4(color,1.0);
}



float plot(vec2 st,float value){
    // 这里计算的是比重
    // 前半部分
    // st.y 的值越接近 value 比重越接近 1
    // st.y 的值 小于等于 value-0.01的都是 0
    // st.y 的值 大于等于 value 的 都是1
    // 后半部分
    // st.y 的值越接近 value+0.01 比重越靠近1
    // st.y 的值 小于等于 value 的都是0
    // st.y 的值大于等于 value+0.01 的都是1

    // 两者相减
    // 越靠近 value 越接近1
    // st.y 的值 小于等于 value-0.01 都是0
    // st.y 的值 大于等于 value+0.01 都是 0

    // 这里解释一下为什么
    // 可以想象下 越靠近 value+0.01 两者相减的值 从 value => value+0.01 越来越趋向0，最终成为 0
    // 直接从前部分即可知道  越靠近 value-0.01 越趋向 0，最终成为 0；
    return smoothstep(value-0.01,value,st.y)
    -smoothstep(value,value+0.01,st.y);
}

void colorLine(){
//    color = (1.0-pct)*colorA + (pct) * colorB;

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color;


    float periodValue = (sin(iTime*PI)+1.0)/2.0;

    float value = pow(st.x,1.0);


    vec3 colorA = vec3(st.x,st.y,st.y);
    vec3 colorB = vec3(1.0,0.0,0.0);

    // 这里的底色是 colorA
    // 这里的目标色是 colorB
    color = mix(colorA,colorB,plot(st,value));

    float smoothValue = smoothstep(0.0,1.0,st.x);
    vec3 smoothColor = vec3(1.0,1.0,0.0);

    // 这里计算比重 按比重混合背景色 和目标色
    color = mix(color,smoothColor,plot(st,smoothValue));

    float sinValue = periodValue*(sin(st.x*PI*2.0)+1.0)/2.0;
    vec3 sinColor = vec3(0.0,0.0,1.0);
    color = mix(color,sinColor,plot(st,sinValue));


    float lineValue = 0.5  * periodValue;
    vec3 lineColor = vec3(1.0,1.0,1.0);
    color = mix(color,lineColor,plot(st,lineValue));


    vec2 point = vec2(0.5,lineValue);
    vec3 pointColor = vec3(0.0,0.0,0.0);

    float dist = distance(st,point);
    color = mix(color,pointColor,dist);


    gl_FragColor = vec4(color,1.0);


}


void main() {
//    moreColor();
//    mixColor();
    colorLine();
}
