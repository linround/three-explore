uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718



// sunset
void sunset(){

    float pX = (sin(iTime)+1.0)/2.0;
    float pY = (sin(iTime)+1.0)/2.0;

    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec2 point = vec2(pX,pY);
    vec3 bgColor = vec3(0.0,0.0,0.0);
    vec3 sunColor = vec3(1.0,1.0,0.0);

    float dist = (1.0-distance(st,point))/1.42;

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


vec3 hsb2rgb(in vec3 c){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0),rgb,c.y);
}


void HSBMap(){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color = vec3(0.0);
    color = vec3(st.x,1.0,st.y);

    // 这里是将rgb映射成hsb
    vec3 hsb = rgb2hsb(color);

    // 这里是将hsb映射为rgb
    vec3 rgb = hsb2rgb(color);

    gl_FragColor = vec4(rgb,1.0);

}


// 定义一个绕某个点进行旋转 的函数
void roate(out vec2 st,float px,float py){
    float angle = 1.0*PI;
    st.x = (st.x-px) * cos(angle) - (st.y-py) * sin(angle)+px;
    st.y = (st.x-px) * sin(angle) + (st.y-py) * cos(angle)+py;
}


// 在极坐标系中计算颜色
void polarCoordinates(){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 color = vec3(0.0);

//    以中心点为原点 计算极坐标

//    计算指向中心点的向量
    float px = 0.5;
    float py = 0.5;
//    这里可以进行旋转
//    roate(st,px,py);
    vec2 toCenter = vec2(px,py)-st;
//    计算角度 (-PI~PI)
    float angle = atan(toCenter.y,toCenter.x);
    //    归一化角度 [-0.5,0.5] => [0, 1.0]
    float normalAngle = angle/TWO_PI + 0.5;

//    计算向量长度
    float radius = length(toCenter)*2.0;

    color = vec3(normalAngle,radius,1.0);

//    将极坐标颜色转换为rgb
    color = hsb2rgb(color);

    gl_FragColor = vec4(color,1.0);
}







// 验证一下 in 类型 是引用传递还是值传递
// 验证结果如下
// 使用 in 类型传递时 是值传递
// 使用 inout 传递时 是引用传递
// 使用 out 类型传递时 是引用传递
void inF(inout vec3 color){
    color = vec3(1.0,1.0,0.0);
}

// 不使用以上三种类型时  是值传递
vec3 inFD( vec3 color){
    color = vec3(1.0,0.0,1.0);
    return color;
}
void testIn(){
    vec3 color = vec3(1.0,0.0,0.0);
    inF(color);

    gl_FragColor = vec4(color,1.0);
}




void main() {
    polarCoordinates();
//     sunset();
//    HSBMap();
//    验证参数的引用传递和值传递
//    testIn();
}
