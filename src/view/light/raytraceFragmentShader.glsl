uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;
#define PI 3.1415926
#define TWO_PI 6.28318530718


const float fov = 10.0;
const float fov_rad = fov / 180.0 * PI;
const float fov_ctg = 1.0 / tan(fov_rad);
const float distance = 10.0;

const float phi = 1.4;
const vec3 icosahedron_vertices[8] = vec3[](
    vec3(1,-1,1),
    vec3(-1,-1,1),
    vec3(-1,1,1),
    vec3(1,1,1),
    vec3(1,-1,-1),
    vec3(-1,-1,-1),
    vec3(-1,1,-1),
    vec3(1,1,-1)
);

const uvec3 icosahedron_triangles[12] = uvec3[](
    uvec3(0, 1, 2),
    uvec3(0, 2, 3),
    uvec3(4, 6, 5),
    uvec3(4, 7, 6),

    uvec3(1, 5, 6),
    uvec3(1, 6, 2),
    uvec3(0, 7, 4),
    uvec3(0, 3, 7),

    uvec3(7, 2, 6),
    uvec3(7, 3, 2),
    uvec3(1, 4, 5),
    uvec3(1, 0, 4)
);

vec4 triangle_intersection(mat3 triangle, vec3 pr, vec3 r)
{
    return inverse(mat4(vec4(triangle[0], 1.0),
    vec4(triangle[1], 1.0),
    vec4(triangle[2], 1.0),
    vec4(-r, 0))) * vec4(pr, 1.0);
}

bool hit_or_miss(vec4 i)
{
    return i.x >= 0.0 && i.x <= 1.0 &&
    i.y >= 0.0 && i.y <= 1.0 &&
    i.z >= 0.0 && i.z <= 1.0 &&
    i.w > 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    vec2 normalized = uv * 2.0 - 1.0;
    vec3 cam_dir = vec3(-sin(iTime), 0, cos(iTime));
    vec3 cam_up = vec3(0, 1, 0);
    vec3 cam_right = cross(cam_up,cam_dir);
    float ratio = iResolution.x / iResolution.y;
    vec3 r = normalize(vec3(normalized.x, normalized.y / ratio, fov_ctg));
    r = cam_right * r.x + cam_up * r.y + cam_dir * r.z;
    vec3 cam_pos = -cam_dir * distance;

    vec4 intersection = vec4(0, 0, 0, 1000000);
    int index = -1;
    for(int i = 0; i < icosahedron_triangles.length(); ++i)
    {
        vec3 p0 = icosahedron_vertices[icosahedron_triangles[i][0]];
        vec3 p1 = icosahedron_vertices[icosahedron_triangles[i][1]];
        vec3 p2 = icosahedron_vertices[icosahedron_triangles[i][2]];
        mat3 triangle = mat3(p0, p1, p2);
        vec4 intersection_tmp = triangle_intersection(triangle, cam_pos, r);

        if(hit_or_miss(intersection_tmp) && intersection_tmp.w < intersection.w)
        {
            intersection = intersection_tmp;
            index = i;
        }
    }
    if(index != -1)
    {
        vec3 p0 = icosahedron_vertices[icosahedron_triangles[index][0]];
        vec3 p1 = icosahedron_vertices[icosahedron_triangles[index][1]];
        vec3 p2 = icosahedron_vertices[icosahedron_triangles[index][2]];
        fragColor = vec4(normalize(cross(p2 - p0, p1 - p0) + 3.0), 1.0);
    }
    else
    {
        fragColor = vec4(vec3(0.),1.0);
    }
}

void main(){
    mainImage(gl_FragColor,gl_FragCoord.xy);
}
