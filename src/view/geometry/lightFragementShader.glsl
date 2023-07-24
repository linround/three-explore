
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;
#define TILES 8.0


void mainImage( out vec4 fragColor, in vec2 fragCoord ){

    // 计算鼠标的坐标
    vec2 mouseCoord = iMouse/iResolution.xy;
    // 计算当前点的坐标
    vec2 curCoord = fragCoord.xy/iResolution.xy;

    float pct = distance(curCoord.xy,mouseCoord);

    // 使用一个衰减函数
    // 这里计算的是当前顶点相对于视口所在的二维坐标点
    vec2 uv = vec2(fragCoord.xy / iResolution.xy);
    // 纹理 大小是8*8的
    // 这里将屏幕坐标直接映射到 8*8 得范围内部
    uv.x = floor(uv.x *float(TILES));
    uv.y = floor(uv.y *float(TILES));

    // 对uv向下取整 floor(uv) 可减少坐标数目
    // 取整后得坐标在进行归一化处理
    // 最终对该坐标进行 纹理采样 获取到坐标点得颜色值
    vec4 textureColor = texture2D(iChannel0, (uv)/TILES);

    fragColor=vec4(textureColor.xyz*(1.0-pct),1.0);
}
void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
