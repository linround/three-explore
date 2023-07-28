uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


// 根据 坐标生成矩形盒子
float box(in vec2 st, in vec2 size){
    float edge = 0.001;
    vec2 center = vec2(0.0,0.0);

    float nx = center.x-size.x/2.0;
    float px = center.x+size.x/2.0;
    float x = smoothstep(nx,nx+edge,st.x)-
    smoothstep(px,px+0.001, st.x);


    float ny = center.y-size.y/2.0;
    float py = center.y+size.y/2.0;
    float y = smoothstep(ny,ny+edge,st.y)-
    smoothstep(py,py+edge,st.y);
    return x*y;
}


// 生成交叉的两个盒子
float crossBox(in vec2 st,in vec2 size){
    float horizontal = box(st,size);
    float vertical = box(st,vec2(size.y,size.x));
    return vertical+horizontal;
}

// 生成一个旋转矩形
mat2 roate2d(float angle) {
    return mat2(cos(angle),-sin(angle),
        sin(angle),cos(angle)
    );
}

// 生成一个缩放矩阵
mat2 scale2d(vec2 value) {
    return mat2(value.x,0,
        0,value.y
    );
}




void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    vec2 translate = vec2(0.5,0.5);
    mat2 roate = roate2d(iTime);
    mat2 scale = scale2d(vec2(0.5*sin(iTime)+1.0));
//    移动中心点
    st-=translate;
//    绕中心点进行旋转
    st *=roate;
    st *= scale;

    vec3 boxColor = vec3(1.0,1.0,1.0);
    vec3 color = vec3(0.0);

    float pct = crossBox(st,vec2(0.3,0.05));
    color = mix(color,boxColor,pct);

    float pct2 = crossBox(st,vec2(0.1,0.2));
    color = mix(color,boxColor,pct2);


    gl_FragColor = vec4(color,1.0);
}
