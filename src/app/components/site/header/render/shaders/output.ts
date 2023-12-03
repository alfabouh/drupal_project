export const vOutputShader = `
    out vec2 verUv;
    void main() {
        verUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
`;

export const fOutputShader = `
    in vec2 verUv;
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    
    void main() {
        vec4 color1 = texture2D(texture1, verUv);
        vec4 color2 = texture2D(texture2, verUv);
        float distance = distance(verUv, vec2(0.5));
        float vignetteStrength = 0.675;
        float vignetteFactor = smoothstep(0.0, vignetteStrength, distance);
        vec4 color = (color1 + color2);
        vec4 outColor = vec4(vec3(color.r, color.g, color.b) * (1. - vignetteFactor), 1.0);
        gl_FragColor = outColor;
    }
`;