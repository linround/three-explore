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

    float iLevel = 1.0 + 20. * (sin(iTime)+1.0);
    vec2 pos = uv ;
    vec3 I = (texture2D(iChannel0, pos)).rgb;

    vec3 I0 = vec3(1.);
    float r = 1.0/2.0;

    float x ;
    float y ;
    float z ;
    for(int i=0;i<int(iLevel);i++){
        vec3 current = I0 * pow(r,float(i));
        vec3 next = I0 * pow(r,float(i)+1.);

        if(I.x<=current.x && I.x>next.x){
            x = current.x;
        }
        if(I.y<=current.y && I.y>next.y){
            y = current.y;
        }
        if(I.z<=current.z && I.z>next.z){
            z = current.z;
        }
    }





    vec3 v = vec3(x,y,z) ;



    gl_FragColor = vec4(v,1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    imageProcess(st);
}
