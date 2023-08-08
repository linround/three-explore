uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float iKernel[9];

#define PI 3.1415926
#define TWO_PI 6.28318530718



#define  width 240.0
#define  height 180.0



float getKernelWight(){
    float sum = 0.0;
    for(int i=0;i<9;i++){
        sum+=iKernel[i];
    }
    return sum<=0.0?1.0:sum;
}



void imageProcess(in vec2 uv){




    vec2 roundPoints[9];
    roundPoints[0]=vec2(-1,-1);
    roundPoints[1]=vec2(0,-1);
    roundPoints[2]=vec2(1,-1);
    roundPoints[3]=vec2(-1,0);
    roundPoints[4]=vec2(0,0);
    roundPoints[5]=vec2(1,0);
    roundPoints[6]=vec2(-1,1);
    roundPoints[7]=vec2(0,1);
    roundPoints[8]=vec2(1,1);


    vec4 colorSum = vec4(0.0);


    //    计算一像素
    vec2 imgSize = vec2(width,height);
    vec2 onePixel = vec2(1.0)/imgSize;
    uv *= imgSize;


    for(int i=0;i<9;i++){
        vec4 color = texture2D(iChannel0, (uv+roundPoints[i])/imgSize);
        colorSum+=color*iKernel[i];
    }
    float kernerWeight = getKernelWight();

    vec3 color = (colorSum/kernerWeight).rgb;

    gl_FragColor = vec4(color,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    imageProcess(st);
}
