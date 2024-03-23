uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;

uniform float saturation;
uniform float hue;



vec4 adjustHue(vec4 color, float angle) {
    float s = sin(angle), c = cos(angle);
    vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
    float len = length(color.rgb);
    color.rgb = vec3(
    dot(color.rgb, weights.xyz),
    dot(color.rgb, weights.zxy),
    dot(color.rgb, weights.yzx)
    );
    return color;
}

vec4 adjustSaturation(vec4 color, float saturation) {
    float average = (color.r + color.g + color.b) / 3.0;
    if (saturation > 0.0) {
        color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));
    } else {
        color.rgb += (average - color.rgb) * (-saturation);
    }
    return color;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){

    // 这里计算的是当前顶点相对于视口所在的二维坐标点
    vec2 uv = vec2(fragCoord.xy / iResolution.xy);


    // 对uv向下取整 floor(uv) 可减少坐标数目
    // 最终对该坐标进行 纹理采样 获取到坐标点得颜色值
    vec4 color = texture2D(iChannel0, uv);

    /**  hue adjustment  **/
    color = adjustHue(color, hue);


    /* saturation adjustment */
    color = adjustSaturation(color, saturation);

    fragColor= color;
}
void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);

}
