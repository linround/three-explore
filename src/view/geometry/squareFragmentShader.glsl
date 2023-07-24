uniform float iTime;
uniform vec3 iResolution;
uniform vec2 iMouse;



float plot(vec2 st,float res){
    return smoothstep(res-0.01,res,st.y) - smoothstep(res,res+0.01,st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    // 这是准备绘制的曲线
    float y = step(0.5,st.x);


    vec3 color = vec3(y);
    float pct = plot(st,y);

    color = (1.0-pct)*color + (pct) * vec3(1.0,0.0,0.0);

    gl_FragColor=vec4(color,1.0);
}
