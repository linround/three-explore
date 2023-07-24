
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;
#define TILES 8.0


void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec3 color;
    float lTime,zTime=iTime;
    vec2 mouseCoord = iMouse/iResolution.xy;
    for(int i=0;i<3;i++) {
        vec2 uv = vec2(0);
        vec2 coord1=fragCoord.xy/iResolution.xy;
        // 中心坐标 右上方移动0.5
        coord1-=mouseCoord;
        // 设置三个通道的时间偏差
        zTime+=0.001;
        lTime=length(coord1);
        uv+=coord1/lTime*(sin(zTime)+1.0)*abs(sin(lTime*9.0-zTime-zTime));
        color[i]=0.01/length(mod(uv,1.0)-0.5);
    }

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

    fragColor=vec4(color/lTime,iTime)+textureColor;
}
void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
