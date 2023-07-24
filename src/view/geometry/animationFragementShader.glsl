
uniform vec3 iResolution;
uniform float iTime;

// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec3 c;
    float l,z=iTime;
    for(int i=0;i<3;i++) {
        vec2 uv,p=fragCoord.xy/iResolution.xy;
        uv=p;
        p-=.5;
        p.x*=iResolution.x/iResolution.y;
        z+=.07;
        l=length(p);
        uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
        c[i]=.01/length(mod(uv,1.)-.5);
    }
    fragColor=vec4(c/l,iTime);
}
void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
