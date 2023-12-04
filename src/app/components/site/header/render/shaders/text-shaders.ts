export const vTextShader = `
    out vec2 verUv;
    void main() {
        verUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
`;

export const fTextShader = `
    in vec2 verUv;
    uniform float meshLength;
    uniform float fadeFactor;
    uniform float appearFactor;

    float interpolateUV(vec2 uv, float start) {
        return (uv.x - min(start, 1.)) / (1. - min(start, 1.));
    }

    void main() {
        float start = 0.5;
        vec2 uv = verUv / vec2(meshLength, 1.);
        vec3 col1 = vec3(0., 1., 0.);
        vec3 col2 = vec3(1.);
        vec3 col3 = vec3(0, 0, (start - min(start - appearFactor, start) / start) * 0.175);
        vec4 final = uv.x < appearFactor ? vec4(col1, 1.) : vec4(col3, 1);
        float factor = appearFactor / 3.0;
        final = (uv.x > factor && uv.x < appearFactor) ? vec4(mix(col1, col2, interpolateUV(uv, factor)), 1.) : final;
        final = vec4(mix(vec3(0.), vec3(final.xyz), interpolateUV(uv, fadeFactor)), 1);
        gl_FragColor = final;
    }
`;