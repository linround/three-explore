uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718




void renderCircle(in vec2 st){
    float r = 0.5;
    vec2 center = vec2(0.0);
    vec3 color = vec3(0.0);
    float len = length(st-center);
    color = vec3(r-len);
    gl_FragColor = vec4(color,1.0);
}
void renderLight(in vec2 st){
    vec3 color = vec3(1.,0.,0.);
    gl_FragColor =vec4(color,1.0);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from -1 to 1 on y-axis)
    vec2 uv = 2.0*(fragCoord/iResolution.xy - vec2(0.5, 0.5));
    uv.x *= iResolution.x/iResolution.y;

    // Light Colors
    vec3 AMBIENT_COL = 0.8*vec3(1.0); // White
    vec3 LIGHT_COL = vec3(0.2, 1.0, 0.2); // Green

    // Material
    float MAT_SPEC = 80.0; // Shininess
    vec3 MAT_COL = vec3(0.2, 0.25, 1.0); // Blue #333fff
    vec3 MAT_COL_2 = vec3(0.2, 0.6, 0.6); // Aqua #339999

    float RADIUS = 0.8;

    vec3 cameraPos = vec3(0.0, 0.0, 2.0);
    vec3 lightPos = vec3(3.0*sin(2.0*iTime), cos(2.0*iTime), RADIUS+0.3);

    if (length(uv) <= RADIUS) {
        // Equation of a sphere:
        // x^2 + y^2 + z^2 = R^2
        float z = sqrt(RADIUS*RADIUS - uv.x*uv.x - uv.y*uv.y);

        vec3 p = vec3(uv, z); // Current position on sphere
        vec3 normal = normalize(p);
        vec3 lightDir = normalize(lightPos - p);

        // Material
        vec3 m = MAT_COL;
        if (p.y <= 0.0 && p.y >= -0.4) {
            m = MAT_COL_2;
        }

        // Ambient
        vec3 ambient = AMBIENT_COL;

        // Diffuse
        vec3 diffuse = max(dot(normal, lightDir),0.0)*LIGHT_COL;

        // Specular
        vec3 view = normalize(cameraPos - p);
        vec3 reflectDir = normalize(reflect(-lightDir, normal));
        float specStrength = max(dot(reflectDir, view), 0.0);
        vec3 specular = 0.3*pow(specStrength, MAT_SPEC)*LIGHT_COL;

        // Output to screen
        fragColor = vec4(m*(ambient + diffuse) + specular, 1.0);
    } else {
        fragColor = vec4(0.7,0.7,0.72,1.0);
    }
}
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    st = (st*2.0)-1.0;
//     renderLight(st);
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
