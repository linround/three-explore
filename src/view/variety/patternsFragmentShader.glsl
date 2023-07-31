uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




// 旋转矩阵
vec2 roate2d( vec2 st,float angle){
//  以某个点为中心进行旋转
//    先将中心移到该点
//    再进行中心旋转
//    最后把中心移回原点
//    这样即可得到绕某一点为中心进行旋转的图案
    st -=1.5;
    st = mat2( cos(angle),-sin(angle),
    sin(angle),cos(angle)
    )*st;
    st+=1.5;
    return st;
}

float plot(in float t,in float s){
    return smoothstep(t-0.01,t,s)-smoothstep(t,t+0.01,s);
}


// patterns col row
float patternsColRow(in float col,in float row, in vec2 st ){
    float pctCol = step(col-1.0,st.x) - step((col),st.x);
    float pctRow = step(row-1.0,st.y) - step((row),st.y);
    return pctCol*pctRow;
}

void patterns(in vec2 st){
    st = vec2(st.x*3.0,st.y*3.0);
    //    旋转90°
    float angle = -PI*sin(iTime)/7.0;
    st = roate2d(st,angle);

    float x = fract(st.x);
    float y = fract(st.y);
    vec3 color = vec3(x,y,0.5);



//    指定行列
    float col = 2.0;
    float row = 2.0;
    float pctColRow = patternsColRow(col,row,st);
//  线条的方程
    float line = (sin(x*2.0*PI)+1.0)/2.0;

//    在指定的行列画出线条
    float pct = plot(line,y)*pctColRow;
    vec3 lineColor = vec3(1.0,1.0,0.0);
    color = mix(color,lineColor,pct);


    gl_FragColor = vec4(color,1.0);
}









void complexPatterns(in vec2 st){

}







void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
//    这个是比较简单的图案
    patterns(st);

}
