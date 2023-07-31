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
    return smoothstep(t-0.1,t,s)-smoothstep(t,t+0.01,s);
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










vec3 complexPatterns(in vec2 st,inout vec3 fragColor){
//
    st = st*8.0;
    st = fract(st);
    vec3 color = fragColor;





// 将坐标范围转化为 [-1,1]
    st = (st*2.0)-1.0;
//    再转化为四个 [0,1]
    st = abs(st);
    float v = -st.x+1.6;
    v = -st.x+1.5*(sin(iTime)+1.0)/2.0;
    float pct = plot(st.y,v);
    color = vec3(st.x,st.y,0.0);
    vec3 lineColor = vec3(1.0,1.0,0.0);

    color = mix(color,lineColor,pct);

    return color;
}





float brick(in vec2 st,in vec2 size,in vec2 center){

    float left = step(center.x-size.x/2.0,st.x);
    float right = step(center.x+size.x/2.0,st.x);
    float top = step(center.y+size.y/2.0,st.y);
    float bottom = step(center.y-size.y/2.0,st.y);

    return (bottom-top)*(left-right);
}
vec3 makeBrick(in vec2 st,inout vec3 fragColor){
    vec2 size = vec2(0.9,0.3);
    vec2 center = vec2(0.5,0.5);
    vec3 color = fragColor;
    vec3 brickColor = vec3(1.0,1.0,0.0);


//    划分st
    st *=8.0;
    float offsetX = iTime;
    st.x = st.x + offsetX*step(1.0,mod(st.y,2.0));

    st = fract(st);



    float pct = brick(st,size,center);
    color =mix(color,brickColor,pct);
    return color;

}








float plotTruchetTiles(in float v, in float s){
    return smoothstep(v-0.001,v,s);
}



vec2 areaRoate2d(in vec2 st,float angle){
    st-=0.5;
    st = mat2( cos(angle),-sin(angle),
    sin(angle),cos(angle)
    )*st;
    st+=0.5;
    return st;
}
vec2 divideArea(inout vec2 st) {
    //    划分坐标
    st = st*2.0;
//  不同区域旋转不同
//
    float numX = step(1.0,st.x);
    float numY = step(1.0,st.y);
    st = fract(st);
    if(numX<1.0){
        if(numY<1.0){
            st = areaRoate2d(st,0.0);
        }else{
            st = areaRoate2d(st,PI/2.0);
        }

    } else if(numX>=1.0){
        if(numY>=1.0){
            st = areaRoate2d(st,PI);
        }else{

            st = areaRoate2d(st,PI*3.0/2.0);
        }
    }

    return st;
}


vec3 makeTruchetTiles(in vec2 st,inout vec3 fragColor){
    float cx = st.x;
    float cy = st.y;
    vec3 color = fragColor;
    vec3 tileColor = vec3(1.0,1.0,1.0);

    st = st*2.0;
    st = fract(st);


//    接着在两个单位区域进行划分
    st = divideArea(st);



    float v = -st.x+1.0;
    float pct = plotTruchetTiles(st.y,v);
    color = mix(color,tileColor,pct);

    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
//    这个是比较简单的图案
//    patterns(st);

//    较为复杂的图案
    vec3 color = complexPatterns(st,gl_FragColor.xyz);
//    生成墙面的砖块
    color = makeBrick(st,color);

//    生成花样瓷砖
//    color = makeTruchetTiles(st,color);
    gl_FragColor = vec4(color,1.0);

}
