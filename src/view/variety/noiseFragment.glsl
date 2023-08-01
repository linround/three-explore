uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718



// 以下是对某个坐标点生成一个随机值
float random(in vec2 st){
//    坐标点点乘某个值
    float vDot = dot(st.xy,vec2(12.9898,78.233));
//    取点乘结果的正弦随机值
    float vSin = sin(vDot*43758.5453123);
//    取随机值的小数部分
    float vf = fract(vSin);


    return vf;
}



float randomSin(){
    float v = sin(iTime);
    return random(vec2(v));
}





// 生成噪声
float noise(vec2 st){

//    获取整数部分 坐标
    vec2 i = floor(st);
//    获取小数部分坐标
    vec2 f = fract(st);
//    小数部分的插值
    vec2 u = f*f*(3.0-2.0*f);

//    在目标产生一个随机值
    float i_0_0 = random(i+vec2(0.0,0.0));
//    在（1，0）带点产生一个随机值
    float i_1_0 = random(i+vec2(1.0,0.0));
// 在 00和10 之间随机插值
    float i1 = mix(i_0_0,i_1_0,u.x);


    float i01 = random(i+vec2(0.0,1.0));
    float i11 = random(i+vec2(1.0,1.0));
    float i2 = mix(i01,i11,u.x);

    float v = mix(i1,i2,u.y);  // 产生的值的范围在[0,1]之间

    return v;
}

mat2 roate2d(float angle){
    return mat2(cos(angle),-sin(angle),
    sin(angle),cos(angle)
    );
}

float line(in vec2 pos,float b){
    float scale = 10.0;
    pos*=scale;
    float v = abs((sin(pos.x*PI)+b*2.0)*0.5);
    return smoothstep(0.0,0.5+b*0.5,v);
}




void makeNoise(in vec2 st){
    vec2 pos = st*vec2(10.0,10.0);
    float pattern = pos.x;

//    计算坐标点噪声
    float n = noise(pos);

//    使用计算出来的噪声点乘以坐标
    pos = roate2d(n)*pos;
    pattern = line(pos,.5);

    gl_FragColor = vec4(vec3(pattern),1.0);

}





float circle(vec2 st,float radius){
//    记录到中心点的距离
    st = vec2(0.5)-st;
    float dist = length(st)*2.0;
    float f= radius;

//  利用角度对半径进行一定的处理
    float angle = atan(st.y,st.x);
//    对角度添加噪声
    angle*=0.5+noise(st+iTime*0.2)*0.1;
//    使用噪声的角度设置直径
    f+=sin(angle*50.0)*0.05*noise(st+iTime*0.2);

    float m = abs(mod(angle+iTime*2.0,TWO_PI)-PI)/3.6;
    m+=noise(st+iTime*0.1)*1.5;
    f+=sin(angle*200.0)*0.1*pow(m,2.);




//    r<= f的都是0
//    1.0- 之后 1.0<=f的都是1.0
    return 1.0-smoothstep(f,f+0.007,dist);
}

float borderCircle(in vec2 st,float radius,float width){
    return circle(st,radius) - circle(st,radius-width);
}


void makeShape(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 lineColor = vec3(1.0,1.0,0.0);

    float pct = borderCircle(st,0.8,0.01);
    color = mix(color,lineColor,pct);

    gl_FragColor = vec4(color,1.0);


}



void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
//    普通的距离长噪声
//    makeNoise(st);

    makeShape(st);
}
