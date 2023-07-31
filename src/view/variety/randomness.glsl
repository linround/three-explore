uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718







float plot(in float v, in float s){
    return smoothstep(v-0.01,v,s)
    -smoothstep(v,v+0.01,s);
}

void makeRandom(in vec2 st){
//    定义混论程度
    float chaotic = 100000.0;

    vec3 color = vec3(0.0,0.0,0.0);

    st.x *=4.0*PI;

    float v = (fract(sin(st.x)*chaotic));
//    向下集中
//    v = v*v;
//    向上集中
//    v =sqrt(v);
//    更加的向下集中
//    v = pow(v,5.0);
    float pct = plot(v,st.y);
    vec3 lineC = vec3(1.0,1.0,0.0);

    color = mix(color,lineC,pct);


    gl_FragColor = vec4(color,1.0);
}


// 使用点乘的方式生成2d平面的随机数

float random(in vec2 st){
    float v = fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123);
    return v;
}
void random2d(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    float v = random(st);
    float pct = plot(v,st.y);
    vec3 pColor = vec3(1.0,1.0,0.0);
    color = mix(color,pColor,pct);
    gl_FragColor = vec4(color,1.0);

}




void randomPoint(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 pColor = vec3(1.0,1.0,0.0);
    st*=10.0;
    vec2 ipos = floor(st); // 整数部分
    vec2 fpos = fract(st); // 小数部分


//    随机生成噪点
    float v = random(ipos); // 整形随机  能够看的更加清晰  （为了能够看见更多的噪点。可以划分足够多的单元格）
//    v = random(fpos); // 浮点数随机  可以看的比较多 但是不清晰
    color = vec3(v);
    gl_FragColor = vec4(color,1.0);

}










vec2 truchetPattern(in vec2 st, in float index){
    index = fract((index-0.5)*10.0);
    if(index>0.75){
//        全部反转
        st = vec2(1.0)-st;
    }else if(index>0.5){
        st = vec2(1.0-st.x,st.y); // 翻转x
    }else if(index >0.25){
        st = vec2(st.x,1.0-st.y);// 翻转y
    }
    return st;
}


// 对图案进行随机翻转 从而得到奇妙的图案

void randomImage(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 lineColor = vec3(1.0,1.0,1.0);
    st*=10.0;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);



//    根据随机值 来对 小数部分进行转换
//    tile 的值是在 [0,1] 内
    vec2 tile = truchetPattern(fpos,random(ipos));
    float v = tile.x;
//    在转换后的区域画线
    float pct = smoothstep(v-0.23,v,tile.y)-
    smoothstep(v,v+0.23,tile.y);
    color = mix(color,lineColor,pct);

//    在转换后的区域画圆
    float inR = 0.5*(sin(iTime)+1.0)/2.0;
    inR = 0.4;
    float outR = 1.0-inR;
    float circlePct = step(inR,length(tile-vec2(0.0)))-step(outR,length(tile-vec2(0.0)))
    + step(inR,length(tile-vec2(1.0)))-step(outR,length(tile-vec2(1.0)));

//    color = mix(color,lineColor,circlePct);


    gl_FragColor =vec4(color,1.0);
}










// 以下的随机都与sin函数相关
void main() {

    vec2 st = gl_FragCoord.xy/iResolution.xy;
//    独立创建的混乱函数
//    makeRandom(st);

//    2d噪点
//    random2d(st);

//    生成随机噪声图像
//    randomPoint(st);
    randomImage(st);

}
