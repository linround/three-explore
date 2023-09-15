uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform int iFrame;
uniform sampler2D iChannel0;

#define MAX_ITERS 255
#define PRECISION 0.001
#define MAX_DIST 100.0
#define MAX_BOUNCES 4
#define PI 3.14159265

float sdfCircle(vec2 cen, float r, vec2 p) {
    return length(p-cen)-r;
}

float sdfSphere(float r, vec3 p) {
    return length(p)-r;
}

float sdfBox(vec3 b, vec3 p) {
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float sdfTotal(vec3 p) {
    return min(
    sdfSphere(1., p),
    min(
    sdfSphere(1., p-vec3(-4.,2.,-4.)),
    -sdfBox(vec3(8.), p)
    )
    );
}

vec4 sdfTotalColor(vec3 p) {
    vec4 d1 = vec4(sdfSphere(1., p), vec3(1.,0.,0.));
    vec4 d2 = vec4(sdfSphere(1., p-vec3(-4.,2.,-4.)), vec3(0.,0.,1.));
    vec4 d3 = vec4(-sdfBox(vec3(8.), p), vec3(1.));
    return d1.x < d2.x ?
    (d1.x < d3.x ? d1 : d3) :
    (d2.x < d3.x ? d2 : d3);
}

vec3 sdfNormals(vec3 p) {
    vec3 eps = vec3(PRECISION,0.,-PRECISION);
    return normalize(vec3(
    sdfTotal(p+eps.xyy)-sdfTotal(p+eps.zyy),
    sdfTotal(p+eps.yxy)-sdfTotal(p+eps.yzy),
    sdfTotal(p+eps.yyx)-sdfTotal(p+eps.yyz)
    )/(2.*PRECISION));
}

float rayMarch(vec3 ray_org, vec3 ray_dir) {
    float d = 0.;
    for(int i = 0; i < MAX_ITERS; i++) {
        vec3 p = ray_org + ray_dir*d;
        float d1 = sdfTotal(p);
        d += d1;
        if (d1 < PRECISION || d > MAX_DIST) break;
    }
    return d;
}

vec3 multipleReflections(vec3 lig_pos, vec3 ray_org, vec3 ray_dir) {
    vec3 result = vec3(0.);
    float contrib = 1.;
    for(int i = 0; i < MAX_BOUNCES; i++) {
        float d = rayMarch(ray_org, ray_dir);
        if(d > MAX_DIST) break;
        vec3 hit_pos = ray_org + ray_dir*d;
        vec3 hit_nor = sdfNormals(hit_pos);
        vec3 lig_dir = normalize(lig_pos - hit_pos);
        vec3 mat_col = sdfTotalColor(hit_pos).yzw;

        float diffuse = clamp(dot(hit_nor, lig_dir), 0., 1.);
        vec3 ref_dir = reflect(-lig_dir, hit_nor);
        float specular = clamp(dot(ref_dir, -ray_dir), 0., 1.);
        specular = pow(specular, 60.);
        if(mat_col.g > 0.) {
            result += mat_col*contrib*clamp(diffuse,0.,1.);
            break;
        }

        result += mat_col*contrib*clamp(.5*diffuse+.5*specular,0.,1.);
        contrib *= 0.9;

        ray_org = hit_pos+hit_nor*2.*PRECISION;
        ray_dir = hit_nor;
    }
    return result;
}

mat2 rotate(float theta) {
    float s = sin(theta), c = cos(theta);
    return mat2(c, -s, s, c);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (2.*fragCoord-iResolution.xy)/iResolution.y;
    vec2 m = iMouse.xy/iResolution.xy;

    float cam_foc = 2.;
    vec3 cam_pos = vec3(0.,0.,4.);
    cam_pos.yz *= rotate(mix(-PI, PI, m.y));
    cam_pos.xz *= rotate(mix(-PI, PI, m.x));

    vec3 tar_pos = vec3(0.);
    vec3 lig_pos = vec3(2.+2.*sin(iTime),4.,4.);
    float ambient = 0.05;

    vec3 cam_dir = normalize(tar_pos - cam_pos);
    vec3 x_axis = normalize(cross(cam_dir, vec3(0.,1.,0.)));
    vec3 y_axis = normalize(cross(x_axis, cam_dir));
    vec3 ray_dir = normalize(cam_dir*cam_foc + x_axis*uv.x + y_axis*uv.y);

    /*
    float d = rayMarch(cam_pos, ray_dir);

    vec3 col = vec3(0.);
    if(d <= MAX_DIST) {
        vec3 hit_pos = cam_pos + ray_dir*d;
        vec3 hit_nor = sdfNormals(hit_pos);
        vec3 lig_dir = normalize(lig_pos - hit_pos);
        float diffuse = clamp(dot(hit_nor, lig_dir), 0., 1.);
        vec3 ref_dir = reflect(-lig_dir, hit_nor);
        float specular = clamp(dot(ref_dir, -ray_dir), 0., 1.);
        specular = pow(specular, 60.);
        float illumination = clamp(ambient + diffuse + specular, 0., 1.);
        vec3 mat_col = vec3(0.9,1.,1.);
        col = mat_col*illumination;
    }
    */
    vec3 col = multipleReflections(lig_pos, cam_pos, ray_dir);
    fragColor = vec4(col,1.0);
}

void main() {
    mainImage(gl_FragColor,gl_FragCoord.xy);
}