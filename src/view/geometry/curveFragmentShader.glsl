uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;



// 这里 x y 差值范围在[-0.02 , 0.02] 之间的值，会返回一个平滑值
// 相差在 范围之外的 返回的是1这个值


// 这里传入
// st 当前的坐标点
// res 当前 坐标点 x的 5次方结果
float plot(vec2 st,float res){
    // 在这里却是正常的下边界 小于 上边界



    // 首先是前半部分
    // 例如 res = 0.4
    // 此时 smoothstep(0.39,0.4,y)
    // y 小于 0.39 的 都是 0
    // y 在 0.39-0.4 之间的是一个插值
    // y 在 4.0 之上的都是 1


    // 后半部分
    // smoothstep(0.4,0.41)
    // y 小于0.4 的都是0
    // y 在 0.4-0.41 之间的都是插值
    // y 在4.01之上的都是1

    // 综上
    // 0.41以上都是0
    // 0.41~0.1 为1-插值
    // 0.4~0.39为插值
    // 0.39以下为0
    return smoothstep(res-0.01,res,st.y) - smoothstep(res,res+0.01,st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    // 这是准备绘制的曲线
    float y = pow(st.x,2.0);


    vec3 color = vec3(y);
    //
    float pct = plot(st,y);// 结果在[0,1]之间

    // 这里也相当于
    // 这里也证明了在计算过程中 向量运算是可以有负值的
    // 但是在最终显示颜色的时候 负值被认为是零，大于1的被认为时1；

    // vec3(1.0,0.0,0.0) - color 这里计算结果包含了负值
    // pct 即在红线范围以外的差值都是1，在红线范围以内的会使用差值方程进行计算

    // 由于线的范围之外都是 0
    // 范围之内都是由插值计算得到
    // 所以
    // 线的范围之外都是背景色 color
    // 范围之内进行插值计算颜色而来

    // 这里减除插值的插值的背景色，是为了减少底色的影响 从而只取得目标线条颜色
    color = (1.0-pct)*color + (pct) * vec3(1.0,0.0,0.0);

    gl_FragColor=vec4(color,1.0);
}
