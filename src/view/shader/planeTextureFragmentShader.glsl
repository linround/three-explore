
uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// By Daedelus: https://www.shadertoy.com/user/Daedelus
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
#define TILES 8.0

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    // 纹理 大小是8*8的
    // 这里将屏幕坐标直接映射到 8*8 得范围内部
    uv.x *= float(TILES);
    uv.y *= float(TILES);

    // 对uv向下取整 floor(uv) 可减少坐标数目
    // 取整后得坐标在进行归一化处理
    // 最终对该坐标进行 纹理采样 获取到坐标点得颜色值
    vec4 color = texture2D(iChannel0, floor(uv)/TILES);

    fragColor =  color;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
