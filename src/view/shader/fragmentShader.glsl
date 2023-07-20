// 这里定义了三个统一值
// 由threejs传入到快着色器


// iResolution定义了整个视口的大小
uniform vec3 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// By Daedelus: https://www.shadertoy.com/user/Daedelus
// license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
#define TIMESCALE 0.25
#define TILES 8
#define COLOR 0.7, 1.6, 2.8

//这里得到的是
// fragColor
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 片段的像素位置除以视口大小即可获得 片段在视口内的相对位置（注意，坐标位置都是归一化之后的）

    // 这里计算的是当前顶点相对于视口所在的二维坐标点
    vec2 uv = fragCoord.xy / iResolution.xy;

    // 这里是得到对应纹理坐标像素的 颜色值
    vec4 noise = texture2D(iChannel0, uv );
    // 这里使用 mod 计算得到小数部分
    float p = 1.0 - mod(noise.r + noise.g + noise.b,1.0);

    vec2 r = mod(uv * float(TILES), 1.0);
    r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));

    fragColor = vec4(COLOR, 1.0) * p;
}

varying vec2 vUv;

void main() {
    mainImage(gl_FragColor, vUv );
}
