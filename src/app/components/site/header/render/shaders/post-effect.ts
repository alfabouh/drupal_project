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
        float blurSize = 0.005;
        float bias = 0.035;
        float size = 64.;

        for (float i = -blurSize; i <= blurSize; i += blurSize / 8.) {
            for (float j = -blurSize; j <= blurSize; j += blurSize / 8.) {
                vec2 offset = vec2(i, j);
                vec4 txt = texture2D(texture1, verUv + offset);
                float br = (txt.r + txt.g + txt.b) / 3.;
                color += txt * br;
            }
        }
        
        color /= pow((size * blurSize + 1.0), 2.);
        gl_FragColor = (((color.r + color.g + color.b) != 0. && color.a > 0.25) ? color * bias : color);
    }
`;