uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




// 定义球体
const float r = 1.0;
const vec3 material1 = vec3(0.2);
const vec3 material2 = vec3(0.5);
const vec3 material3 = vec3(0.6,0.7,0.6);
const vec3 material4 = vec3(0.0,0.6,1.0);

vec3 getSphereMaterial(in vec3 point){
    if(point.x>0.&& point.y>0.){
        return material1;
    } else if(point.x<=0. && point.y>0.){
        return material2;
    } else if(point.x<=0. && point.y<=0.){
        return material3;
    }
    return material4;
}


vec3 renderSphere(in vec2 st){
    vec3 bgColor = vec3(0.);
    vec3 color;
    float len = length(st);
    if(len<=1.0){
        float z = sqrt(1.0- len*len);
        vec3 sphereVertex = vec3(st,z);
        color = getSphereMaterial(sphereVertex);

    }

    color = mix(bgColor,color,1.);
    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*4.0)-2.;
    vec3 color =  renderSphere(st);
    gl_FragColor = vec4(color,1.0);
}
