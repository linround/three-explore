uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;



// 这里 x y 差值范围在[-0.02 , 0.02] 之间的值，会返回一个平滑值
// 相差在 范围之外的 返回的是1这个值
float plot(vec2 st){
    return smoothstep(0.0,0.02,abs(st.y-st.x));
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    float y = st.x;



    vec3 color = vec3(y);
    //
    float pct = plot(st);
    color = vec3(pct)*color;

    gl_FragColor=vec4(color,1.0);
}
