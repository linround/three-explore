
uniform vec3 iResolution;
uniform float iTime;

// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec3 c;
    float lTime,zTime=iTime;
    for(int i=0;i<3;i++) {
        vec2 uv,p=fragCoord.xy/iResolution.xy;
        p-=0.5;
        p.x*=iResolution.x/iResolution.y;
        zTime+=0.07;
        lTime=length(p);
        uv+=p/lTime*(sin(zTime)+1.0)*abs(sin(lTime*9.0-zTime-zTime));
        c[i]=0.01/length(mod(uv,1.0)-0.5);
    }
    fragColor=vec4(c/lTime,iTime);
}
void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
