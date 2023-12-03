export const vTextShader = `
    out vec2 verUv;
    void main() {
        verUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
`;

export const fTextShader = `
    in vec2 verUv;
    uniform float textLength;
    uniform float fadeFactor;

    float interpolateUV(vec2 uv, float start) {
        return (uv.x - start) / (1. - start);
    }

    void main() {
        float start = 0.3;
        vec2 uv = verUv / vec2(textLength, 1.);
        vec3 col1 = vec3(0., 1., 0.);
        vec3 col2 = vec3(1.);
        vec3 col3 = vec3(0.);
        vec4 final = vec4(col1, 1.);
        final = uv.x >= start ? vec4(mix(col1, col2, interpolateUV(uv, start)), 1) : final;

        final = vec4(mix(col3, vec3(final.x, final.y, final.z), min(interpolateUV(uv, fadeFactor), 1.)), 1);
        gl_FragColor = final;
    }
`;