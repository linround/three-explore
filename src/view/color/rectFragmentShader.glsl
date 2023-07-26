uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718

float rectLeftBottom (in vec2 st, in vec2 leftBottom){
//    rect 是如何构造的？
//    传入了平面坐标 和 矩形 的左下角坐标
//    首先确定边界

//    x轴
//    小于 leftBottom.x 平滑为 0
//    大于 leftBottom.x + 0.001 平滑为 1
//    leftBottom.x 到 leftBottom.x + 0.001 是越来越接近1的

    float leftSide = smoothstep(leftBottom.x,leftBottom.x+0.001,st.x);
//    y轴
//    小于 leftBottom.y 的平滑为 0
//    大于 leftBottom.y+0.001 的平滑为 1
//    leftBottom.y 到 leftBottom.y + 0.001 是越来越接近1的
    float bottomSide = smoothstep(leftBottom.y,leftBottom.y+0.001,st.y);

//    两者相交 即相差 即可得到对应点 leftBottom 的矩形
    return leftSide * bottomSide;
}


float rectTopRight(in vec2 st,in vec2 topRight){
//    x 轴
//    小于 topRight.x 会直接 为 1
//    大于 topRight.x+0.001 会直接为 0
//    topRight.x 到 topRight.x+0.001 越来越接近 0
    float rightSide = smoothstep(topRight.x+0.001,topRight.x,st.x);

//    y轴
//    小于 topRight.y 会直接为1
//    大于 topRight.y+0.001 直接为0
//    topRight.y 到 topRight.y+0.001 越来越接近0
    float topSide = smoothstep(topRight.y+0.001,topRight.y,st.y);

//    两两相交 即可得到对应点 topRight 的矩形
    return topSide*rightSide;
}



float rectVertex(in vec2 st, in vec2 bottomLeftVertex,in vec2 topRightVertex){
    float bottomLeft = rectLeftBottom(st,bottomLeftVertex);
    float topRight = rectTopRight(st,topRightVertex);
    return bottomLeft * topRight;
}

void vertexRect(){
    vec2 bottomLeft = vec2(0.1,0.1);
    vec2 topRight = vec2(0.9,0.9);
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    float pct = rectVertex(st,bottomLeft,topRight);

    vec3 bgColor = vec3(0.0,0.0,0.0);

    vec3 colorA = vec3(0.0,1.0,0.0);
    vec3 colorB = vec3(0.0,0.0,1.0);

    vec3 color = mix(bgColor,colorA,pct);
    gl_FragColor = vec4(color,1.0);

}



void generateRect(){
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec3 bgColor = vec3(0.0,0.0,0.0);

    vec3 colorA = vec3(0.0,1.0,0.0);
    vec3 colorB = vec3(0.0,0.0,1.0);

    // 这里使用step函数
    // x<0.5 返回 0.0
    // x>0.5 返回 1.0
    vec3 color = mix(bgColor,colorA,step(.5,st.x));

    color = mix(color,colorB,rectTopRight(st, vec2(0.5,0.5)));

    gl_FragColor = vec4(color,1.0);
}

void main(){
//    传统的方式生成矩形
//    generateRect();
//  使用顶点生成矩形
    vertexRect();
}
