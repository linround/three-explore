uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;

#define WIDTH 640.0
#define HEIGHT 480.0

void mainImage( out vec4 fragColor, in vec2 fragCoord ){

    // 这里计算的是当前顶点相对于视口所在的二维坐标点
    vec2 uv = vec2(fragCoord.xy / iResolution.xy);

    // 对uv向下取整 floor(uv) 可减少坐标数目
    // 最终对该坐标进行 纹理采样 获取到坐标点得颜色值
    vec4 textureColor = texture2D(iChannel0, uv);

    fragColor=vec4(textureColor.xyz,1.0);
}
void main() {


    mainImage(gl_FragColor,gl_FragCoord.xy);

}
