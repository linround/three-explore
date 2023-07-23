uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;



// 这里 x y 差值范围在[-0.02 , 0.02] 之间的值，会返回一个平滑值
// 相差在 范围之外的 返回的是1这个值


// 这里传入的是一个绝对值
// 所以xy绝对值在范围内时，取得范围内的一个 差值结果；
// 在范围外时（也就是一定大于上边界），取得的结果时 1；
// 这是一个线性差值
float plot(vec2 st){
    return smoothstep(0.01,0.0,abs(st.y-st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    // 这是准备绘制的曲线
    float y = st.x;


    vec3 color = vec3(y);
    //
    float pct = plot(st);// 结果在[0,1]之间

    // 这里也相当于
    // 这里也证明了在计算过程中 向量运算是可以有负值的
    // 但是在最终显示颜色的时候 负值被认为是零，大于1的被认为时1；

    // vec3(1.0,0.0,0.0) - color 这里计算结果包含了负值
    // pct 即在红线范围以外的差值都是1，在红线范围以内的会使用差值方程进行计算

    // 以上由于交换了上下边界的大小 可观察 smoostep函数
    // pct 此时 在红线范围内 为差值结果，在红线范围外为1
    // 所以红线范围外的只有背景色
    // 红线范围内的 就是 差值结果 + 背景色
    color = (1.0-pct)*color + pct * vec3(1.0,0.0,0.0);

    gl_FragColor=vec4(color,1.0);
}
