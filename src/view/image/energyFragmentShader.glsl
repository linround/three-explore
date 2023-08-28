uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float iKernel[9];

#define PI 3.1415926
#define TWO_PI 6.28318530718



int width = 5642;
int height = 3761;



float getKernelWight(){
    float sum = 0.0;
    for(int i=0;i<9;i++){
        sum+=iKernel[i];
    }
    return sum<=0.0?1.0:sum;
}



void imageProcess(in vec2 uv){
    vec3 maxV = vec3(1.);
    vec3 minV = vec3(0.);
    vec2 imgSize = vec2(width,height);

    vec2 pos = uv ;
    vec3 I = (texture2D(iChannel0, pos)).rgb;

    // 划分能级
    float n = 2.;
    vec3 I0 = maxV;
    float r = 1.0/n;
    vec3 level = ceil(n*I/I0);
    float x = I0.x * pow(r,level.x);
    float y = I0.y * pow(r,level.y);
    float z = I0.z * pow(r,level.z);
    vec3 v =1.- vec3(x,y,z) ;




//    vec4 color = texture2D(iChannel0, (uv));

    gl_FragColor = vec4(v,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    imageProcess(st);
}
