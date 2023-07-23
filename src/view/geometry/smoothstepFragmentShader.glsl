
void main() {

    // 此处验证 smoothstep 函数的规律
    float value = smoothstep(0.3,0.5,0.9);
    float v1 = 0.5; // value = 0.5

    float v2 = 0.216; // value = 0.3

    gl_FragColor = vec4(value,1.0,1.0,1.0);
}
