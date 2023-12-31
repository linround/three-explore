// 这里定义了三个统一值
// 由threejs传入到快着色器

// iResolution定义了整个视口的大小
uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// By Daedelus: https://www.shadertoy.com/user/Daedelus
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
#define TILES 8.0

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 片段的像素位置除以视口大小即可获得 片段在视口内的相对位置（注意，坐标位置都是归一化之后的）

    // 这里计算的是当前顶点相对于视口所在的二维坐标点
    vec2 uv = fragCoord.xy;

    // 对uv向下取整 floor(uv) 可减少坐标数目
    // 取整后得坐标在进行归一化处理
    // 最终对该坐标进行 纹理采样 获取到坐标点得颜色值
    vec4 color = texture2D(iChannel0, uv);

    fragColor = color;
}
// 顶点着色其传入的uv坐标
varying vec2 vUv;

void main() {
    mainImage(gl_FragColor, vUv );
}
