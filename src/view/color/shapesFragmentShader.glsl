uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


void shapes(in vec2 st){
    vec3 red = vec3(1.0,0.0,0.0);
    vec3 blue = vec3(0.0,0.0,1.0);
    vec3 color;

    if(st.x>0.5){
        color = red;
    } else {
        color = blue;
    }
    gl_FragColor = vec4(color,1.0);
}

void Step(in vec2 st){
    float left = step(0.1,st.x);
    float bottom = step(0.1,st.y);
    vec3 color;
//    color = vec3(left,0.0,bottom);
//    color = vec3(left*bottom);


//    结合一下
    vec2 bottomLeft = vec2(0.25,0.25);
    vec2 border1 = step(bottomLeft,st);
    color = vec3(border1.x,0.0,border1.y);
    color = vec3(border1.x*border1.y,0.0,0.0);



    vec2 topRight = vec2(0.25,0.25);
    vec2 border2 = step(topRight,1.0-st);
    color = vec3(border2.x,0.0,border2.y);
    color = vec3(border2.x*border2.y,0.0,0.0);


//    再结合
    color = vec3(border1.x*border2.x*border2.y*border1.y,0.0,0.0);


    gl_FragColor = vec4(color,1.0);
}



// floor 是向下取整
void Floor(in vec2 st){
    float px = floor(st.x);
    float py = floor(st.y);

    vec3 color = vec3(px,0.0,py);
    gl_FragColor = vec4(color,1.0);
}














void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
// 基础语句
//  shapes(st);

    // 使用 step 函数
    Step(st);

//    Floor(st);

}
