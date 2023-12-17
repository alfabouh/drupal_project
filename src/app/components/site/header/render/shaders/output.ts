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
    uniform vec2 mouse;

    void main() {
        vec4 color1 = texture2D(texture1, verUv);
        vec4 color2 = texture2D(texture2, verUv);
        float dist = distance(verUv, vec2(0.5));
        float vignetteStrength = 0.675;
        float vignetteFactor = smoothstep(0.0, vignetteStrength, dist);
        vec4 color = (color1 + color2);
        vec4 outColor = vec4(vec3(color.r, color.g, color.b) * vignetteFactor, 1.0);

        float fromMouseDistance = distance(verUv, mouse);
        float fct = smoothstep(0., .2, fromMouseDistance);
        outColor = vec4(vec3(outColor.r, outColor.g, outColor.b) * vec3(fct, 3.0, fct), 1.);

        gl_FragColor = outColor;
    }
`;