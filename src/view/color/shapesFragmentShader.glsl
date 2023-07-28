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









//
float smoothBorder(float edge,float value,float blur){
    return smoothstep(edge-blur,edge,value)-smoothstep(edge,edge+blur,value);
}


// r 半径
// center 圆的中心坐标
// st 圆所在平面坐标
// format 是否使用平滑smooth 边缘
float makeCirle(float r,vec2 center,in vec2 st,bool format ){
    float len = distance(center,st);
//    len = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
//    len = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
//    len = min(distance(st,vec2(0.8)),distance(st,vec2(0.2)));
//    len = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
//    len = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    float pct = 0.0;
    float borderWidth = 0.005;

    //    format 用来判断是否使用smooth 来平滑边缘
    if(format) {
//        使用blur 来设置平滑的范围
        float blur = 0.02;
        pct = smoothBorder(r,len,blur);
    } else {
        float outPct = step(r,len);
        float inPct = step(r+borderWidth,len);
        pct = outPct - inPct;
    }
    return pct;
}


void circle(in vec2 st){



    float py = (sin(iTime)+1.0)/2.0;
    float px = py;
    float r = (sin(iTime)+1.0)/20.0;
    vec3 bgColor = vec3(st.x);


//    几何step 函数可以绘制一个圆
    float pct = makeCirle(r,vec2(px,0.5),st,false);
    vec3 borderColor = vec3(1.0,1.0,0.0);
    vec3 color = mix(bgColor,borderColor,pct);


//    这里使用的smoothstep绘制了一个外圆，通过调节 blur 实现边缘的模糊效果
    float smoothPct = makeCirle(r*2.0,vec2(0.5,py),st,true);
    vec3 smoothColor = vec3(0.0,0.0,1.0);
    color = mix(color,smoothColor,smoothPct);


    float staticPct = makeCirle(r,vec2(0.5,0.5),st,true);
    vec3 staticColor = vec3(0.0,1.0,1.0);
    color = mix(color,staticColor,staticPct);

    gl_FragColor = vec4(color,1.0);
}




// 下面介绍如何使用点乘  来实现圆形
// 使用 sqrt 函数所计算的长度 会耗费较多的计算性能
// 这里的r 实际代表的应该是直径
float dotCircle(in vec2 st, in float rSquared){
    vec2 dist = st-vec2(0.5);


    // 这里使用点乘 计算了距离的平方
    // 距离的平方 和 r 进行比较。
    // 小于特定值 v-0.001 的在平滑直接为1
    // 大于特定值 v 的 直接为0
    // 对于 v-0.001 到 v 的过程是一个平滑为0的过程


    // 针对这个函数中的v 其实应该看作半径的平方
    // 在这里 优化了一个计算方法
    // 将通常使用 根号 来确定半径 然后进行约束的方式 ；转化为了 给定半径的平方，从而判断 向量长度的平法
    // 将开根号 的方式 优化成 乘法的方式
    float pct = smoothstep(rSquared,rSquared-0.001,dot(dist,dist));
    return pct;
}
void makeDotCircle(in vec2 st){
    float num = (sin(iTime)+1.0)/2.0;
    float rSquared = 0.25 * num;
    float pct = dotCircle(st,rSquared);

    gl_FragColor = vec4(vec3(pct),1.0);
}








// 制作距离场

void makeDistanceFields(in vec2 st){
    vec3 color = vec3(1.0,0.0,0.0);
    float d = 0.0;
//    定义一个动态的[0,1]范围中心点
    float px = (sin(iTime)+1.0)/2.0;
    float py = px;

//    将st 从[0,1] 映射到 [-1,1]
    st = st*2.0-1.0;

//  在每一个区域中 都计算对应区域坐标点 与中心点的向量
    vec2 center = vec2(px,py);
    vec2 dist = (abs(st)-center);

//    计算每一个向量的长度并乘以10  以此扩充范围
//    d = length(dist)*10.0;


//    min(dist,vec2(0.3))
//
    float multiple = 10.0;
    d = length( dist )*multiple;
//    d = length( min(dist,center) )*multiple;

//    产生一个带圆角的矩形
//    d = length(max(dist,vec2(0.1,0.1)))*10.0;
//    使用fract 函数对每一段区域进行取小数，来表示颜色
//    color = vec3(fract(d));

//    大于三的全是白色
//    color = vec3(step(3.0,d));

    color = vec3((step(3.0,d))-(step(4.0,d)));


    gl_FragColor = vec4(color,1.0);
}


// 上述 展示了
// 1. 求每个区域点 到中心点center 的向量 dist（有中心点指向坐标点）
// 2. 比较该向量 使用  min(dist,vec2(0.1,0.1))
// 3. 对于 x,y分力量都大于 vec2(0.1,0.1) ，回去固定向量 vec2(0.1,0.1)
// 4. 其余坐标向量按规则取
// 5. 比如dist = [0.2 0.05] =>[0.1,0.05]












// 关于如何构建 圆形
// 化简后 （0.5 -x）2 + y2 = 0.25
// 以上 通用可以使用极坐标方程

void circle_0_5_0(in vec2 st){
    vec3 bg = vec3(0.0);
    vec3 circleColor = vec3(0.0,0.0,1.0);

    vec2 center = vec2(0.5,0);
    float r = 0.5;
    vec2 pos = center - st;
    float len = length(pos);
    float pct = step(r,len);
    vec3 color = mix(bg,circleColor,pct);
    gl_FragColor = vec4(color,1.0);

}
// 使用方程 （0.5 -x）2 + （0.5 -y）2 = 0.5-y
//化简后 （0.5 -x）2 + y2 = 0.25
void circleTest(in vec2 st){
    vec3 bg = vec3(0.0);
    vec3 circleColor = vec3(1.0,0.0,0.0);

    vec2 pos = vec2(0.5)-st;
    float len = length(pos);
    float r = 0.5;

//    分析这里 在st.y>0.5的上面 始终是小于0的 所哟阶跃函数产生的是1
//    主要的分析需要注意 st.y < 0.5 的部分
//    在这一部分 0.5-st.y的值需要小于len2（len2表示len的平方）；
//    该如何看待这一点？
    float pct = step(r-st.y,len*len);
    vec3 color = mix(bg,circleColor,pct);
    gl_FragColor = vec4(color,1.0);
//    circle_0_5_0(st);

}



// 使用极坐标来构建形状
// 通过改变角度和圆的半径 以此获得不同的形状
void polarShapes(in vec2 st) {
    float num = 1.3*sin(iTime)*(sin(iTime)+1.0)/2.0;
    vec3 color = vec3(0.0,0.0,0.0);
//    坐标向量
    vec2 pos = vec2(0.5,0.5)-st;
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
    float f = (cos(a*num));
//    f = (cos(a));
//    f = abs(sin(a));
//    f = abs(sin(a*10.0));

//    smoothstep 获取的是
//    小于f 全是0
//    大于f+0.02 全是1
    float pct =1.0-smoothstep(f,f+0.02,r);
//    step(f,r)  f小于 r 是0.0； f大于 r 是1.0
//    所以区域指的是 cos(a)>leng(pos)
    pct = step(r,f);
    vec3 circleColor = vec3(1.0,0.0,0.0);
    color = mix(color,circleColor,pct);


    gl_FragColor = vec4(color,1.0);

}


void polygon(in vec2 st){

    vec3 color = vec3(0.0);
    float d = 0.0;
//    坐标映射到 [-1,1]
    st = st*2.0-1.0;
//    多边形的边数
    int N = (5);

//    当前坐标的角度和半径
    float a = atan(st.y,st.x);
    float r = TWO_PI/float(N);

//    距离场
    d = cos(floor(0.9+a/r)*r-a)*length(st);

    float pct = step(0.4,d);
    color = vec3(pct);



    gl_FragColor = vec4(color,1.0);
}
















void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
// 基础语句
//  shapes(st);

    // 使用 step 函数 绘制一个矩形
//    Step(st);

//    Floor(st);

//
//    生成圆的 常用方式
//    circle(st);
//    使用点乘 生成圆
//    makeDotCircle(st);


//  关于距离场
//    makeDistanceFields(st);




// 普通的圆心和半径来构建 圆
//    circleTest(st);


    //    使用极坐标构建形状
//    polarShapes(st);


    polygon(st);

}
