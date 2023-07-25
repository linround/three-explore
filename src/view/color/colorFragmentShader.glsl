uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;



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
void mixCOlor(){

    vec3 color = vec3(0.0);
    float pct = abs(sin(iTime));
    color = mix(colorA,colorB,pct);
    gl_FragColor = vec4(color,1.0);
}



float plot(){
    return 0.0;
}



void main() {
//    moreColor();
    mixCOlor();
}
