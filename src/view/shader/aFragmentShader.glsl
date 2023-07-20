// 画布的视口
uniform vec3 iResolution;
// 事件序列
uniform float iTime;


// 传入块颜色 和 块坐标
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    // 计算相对视口的相对坐标
    vec2 uv = fragCoord/iResolution.xy;
    // 计算颜色
    vec3 col = 0.5 + 0.5 * cos(iTime+uv.xyx);

    // 输出到屏幕
    fragColor = vec4(col,1.0);

}

void main(){
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
