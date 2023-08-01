uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718



void cell(in vec2 st){
    vec3 color = vec3(0.0,0.0,0.0);
    vec2 points[5];
    points[0] = vec2(0.8,0.2);
    points[1] = vec2(0.2,0.8);
    points[2] = vec2(0.8,0.65);
    points[3] = vec2(0.32,0.25);
    points[4] = iMouse/iResolution.xy;


    float mDist = 1.0;
    for(int i=0;i<5;i++){
        float dist = distance(st,points[i]);
//        这里取距离小于1.0的值
//        在五个点处都进行比较  最终取最近的那个点的值
//        比如说点(1,1);
//        该店距离某个点的最小值 即为最终的值
        mDist = min(mDist,dist);
    }
    color+=mDist;
    gl_FragColor = vec4(color,1.0);

}











vec2 random2(vec2 p){
//    使用点乘和sin函数 实现随机值
    float dotX = dot(p,vec2(127.1,311.7));
    float dotY = dot(p,vec2(269.5,183.3));
    vec2 v = sin(vec2(dotX,dotY))*43758.5453;
    return fract(v);
}


void gridCell(in vec2 st){

    vec3 color = vec3(0.0);
    vec3 centerColor = vec3(1.0,1.0,0.0);
//    放大
    st *= 3.0;
//    进行分割
    vec2 ist = floor(st);
    vec2 fst = fract(st);


    {

        //    使用坐标 整数部分生成随机点
        //    某一块内 整数部分生产的随机点是一样的
        vec2 point = random2(ist);

        //    在该单位区域内
        //    计算生成的随机点与当前坐标小数部分的差值 向量
        vec2 diff = point - fst;
        //    计算该项量的长度
        float dist = length(diff);


        color=vec3(dist);
        //    绘制这个中心点
        //    距离中心点小于0.02的都是0，外部都是1
        float pct = step(0.02,dist);
        color=mix(color,centerColor,1.0-pct);
    }

    gl_FragColor = vec4(color,1.0);
}










void dynamicGridCell(in vec2 st){

    vec3 color = vec3(0.0);
//    划分单元格
    st*=8.0;

    vec2 ist = floor(st);
    vec2 fst = fract(st);
    float mDist = 1.0;// 最近的距离
    vec2 mPoint; // 保留最近的点

//    计算周围单元格中心形成该单元格的距离分布
    for(int y=-1;y<=1;y++){
        for (int x = -1;x<=1;x++){
            vec2 neighbor = vec2(float(x),float(y));

//            计算其邻居的随机中心位置以及自己的中心位置
            vec2 point = random2(ist+neighbor);

            point = 0.5+0.5*sin(iTime+TWO_PI*point);

//            point 计算的是 某个点的随机位置。加上neighbor即可得到该 网格的中心位置
//            减去fst 即可得到在某个邻居中中心点到该网格小数部分的距离
            vec2 diff =neighbor+point-fst;
            float dist = length(diff);
            if(dist<mDist){
                mDist = dist;
                mPoint = point;
            }

        }
    }

    color = vec3(mDist);


//    如果该点的及其周围八个邻点
    float pct = 1.-step(.03, mDist);

//    绘制中心
    color = mix(color,vec3(1.0),pct) ;
    color.z = mPoint.y*mPoint.x;



    color.b += step(.99, fst.x) + step(.98, fst.y);
    gl_FragColor = vec4(color,1.0);

}











void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
//    cell(st);

//    gridCell(st);

    dynamicGridCell(st);
}
