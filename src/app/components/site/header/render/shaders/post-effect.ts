export const vGaussShader = `
    out vec2 verUv;
    void main() {
        verUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
`;

export const fGaussShader = `
    in vec2 verUv;
    uniform sampler2D texture1;

    void main() {
        vec4 color = vec4(0.0);
        const float blurSize = 0.004;
        const float bias = 0.035;
        const float size = 48.;
        const float step = blurSize / 6.;

        for (float i = -blurSize; i <= blurSize; i += step) {
            for (float j = -blurSize; j <= blurSize; j += step) {
                vec2 offset = vec2(i, j);
                vec4 txt = texture2D(texture1, verUv + offset);
                float br = (txt.r + txt.g + txt.b) / 2.5;
                color += txt * br;
            }
        }
        
        color /= pow((size * blurSize + 1.0), 4.);
        gl_FragColor = color * bias;
    }
`;