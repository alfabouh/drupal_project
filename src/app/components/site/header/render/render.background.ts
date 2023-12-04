import * as ThreeJs from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry.js';
import $ from 'jquery';
import { fTextShader, vTextShader } from './shaders/text-shaders';
import { Utils } from 'src/app/utils/Utils';
import { fGaussShader, vGaussShader } from './shaders/post-effect';
import { fOutputShader, vOutputShader } from './shaders/output';

let renderer: ThreeJs.Renderer;

let scene: ThreeJs.Object3D;
let camera: ThreeJs.OrthographicCamera;
let RenderCharMaxWidth: number = 0;
let RenderCharMaxHeight: number = 0;
let MaxRenderStrokes: number = 0;
let maxRenders = 128;
let strMesh: StringRenderMesh[] = new Array<StringRenderMesh>(maxRenders);
let WIDTH_PRC: number = 1.0;
let HEIGHT_PRC: number = 0.86;
let clock: ThreeJs.Clock = new ThreeJs.Clock;

$(() => {
    renderer = new ThreeJs.WebGLRenderer();
    renderer.setSize(getWinWidth(), getWinHeight());
    scene = new ThreeJs.Scene();
    camera = new ThreeJs.OrthographicCamera(0, getWinWidth(), getWinHeight(), 0, 1, 1000);
    camera.position.set(0, 0, 25);

    calcFontBounds().then((e) => {
        let s: number[] = e as Array<number>;
        RenderCharMaxWidth = s[0];
        RenderCharMaxHeight = s[1];
        initShapes();
    });
    $(window).on("resize", () => {
        calcFontBounds().then((e) => {
            setCameraFrustum(camera);
            camera.updateProjectionMatrix();
            renderer.setSize(getWinWidth(), getWinHeight());
        });
    });
});

function getWinWidth(): number {
    return window.innerWidth * WIDTH_PRC;
}

function getWinHeight(): number {
    return window.innerHeight * HEIGHT_PRC;
}

async function calcFontBounds() {
    return new Promise((resolve, reject) => {
        new FontLoader().load('/assets/img/font.json', (font) => {
            let fparam: TextGeometryParameters = StringRenderMesh.fontParams(font);
            let newtextGeometry: TextGeometry = new TextGeometry("0", fparam);
            newtextGeometry.computeBoundingBox();
            let e: number[] = new Array<number>(2);
            e[0] = (newtextGeometry.boundingBox as ThreeJs.Box3).max.x - (newtextGeometry.boundingBox as ThreeJs.Box3).min.x;
            e[1] = (newtextGeometry.boundingBox as ThreeJs.Box3).max.y - (newtextGeometry.boundingBox as ThreeJs.Box3).min.y;
            MaxRenderStrokes = (getWinHeight() / e[1] - 1) * 0.5;
            resolve(e);
        });
    });
}

function setCameraFrustum(camera: ThreeJs.OrthographicCamera): void {
    camera.left = 0;
    camera.right = getWinWidth();
    camera.top = getWinHeight();
    camera.bottom = 0;
    camera.near = 1;
    camera.far = 1000;
}

function initShapes(): void {
    for (let i: number = 0; i < strMesh.length; i++) {
        strMesh[i] = new StringRenderMesh(i, scene, new StringConveyor());
    }
    $("#render_head").append(renderer.domElement);
}

export function onrender(): void {
    let delta: number = clock.getDelta();
    requestAnimationFrame(onrender);
    if (scene !== undefined && camera !== undefined) {
        const renderTarget = new ThreeJs.WebGLRenderTarget(getWinWidth(), getWinHeight());
        const renderTarget2 = new ThreeJs.WebGLRenderTarget(getWinWidth(), getWinHeight());

        (renderer as ThreeJs.WebGLRenderer).setRenderTarget(renderTarget);
        renderer.render(scene, camera);

        const mrtShaderGauss: ThreeJs.ShaderMaterial = new ThreeJs.ShaderMaterial({
            uniforms: {
                texture1: { value: renderTarget.texture }
            },
            vertexShader: vGaussShader,
            fragmentShader: fGaussShader
        });

        const mrtPlane1: ThreeJs.PlaneGeometry = new ThreeJs.PlaneGeometry(getWinWidth(), getWinHeight());
        const mesh1: ThreeJs.Mesh = new ThreeJs.Mesh(mrtPlane1, mrtShaderGauss);
        mesh1.position.set(getWinWidth() / 2, getWinHeight() / 2, 0);
        (renderer as ThreeJs.WebGLRenderer).setRenderTarget(renderTarget2);
        renderer.render(mesh1, camera);

        mrtShaderGauss.dispose();
        mrtPlane1.dispose();

        const outShaderGauss: ThreeJs.ShaderMaterial = new ThreeJs.ShaderMaterial({
            uniforms: {
                texture1: { value: renderTarget.texture },
                texture2: { value: renderTarget2.texture }
            },
            vertexShader: vOutputShader,
            fragmentShader: fOutputShader
        });

        const mrtPlane2: ThreeJs.PlaneGeometry = new ThreeJs.PlaneGeometry(getWinWidth(), getWinHeight());
        const mesh2: ThreeJs.Mesh = new ThreeJs.Mesh(mrtPlane2, outShaderGauss);
        mesh2.position.set(getWinWidth() / 2, getWinHeight() / 2, 0);
        (renderer as ThreeJs.WebGLRenderer).setRenderTarget(null);
        renderer.render(mesh2, camera);

        outShaderGauss.dispose();
        mrtPlane2.dispose();
        renderTarget.dispose();
        renderTarget2.dispose();
    }
    for (let i: number = 0; i < MaxRenderStrokes; i++) {
        let e: StringRenderMesh = strMesh[i];
        if (e !== undefined) {
            e.tick(delta);
            if (e.shouldRedraw()) {
                e.redraw();
            }
        }
    }
}

class StringRenderMesh {
    private conveyor: StringConveyor;
    private currentMesh: ThreeJs.Mesh | null = null;
    private currentTextGeometry: TextGeometry | null = null;
    private scene: ThreeJs.Object3D;
    private currentMaterial: ThreeJs.ShaderMaterial | null = null;
    private fadeTick = 0;
    private appearTick = 0;
    private meshLength = 0;
    private id: number;
    private appendSpeed: number;

    constructor(id: number, scene: ThreeJs.Object3D, strCon: StringConveyor) {
        this.conveyor = strCon;
        this.scene = scene;
        this.constructGeometries();
        this.id = id;
        this.appendSpeed = Utils.getRandomNum(12, 18);
    }

    public get getAppendSpeed(): number {
        return this.appendSpeed;
    }

    public tick(delta: number): void {
        const factor: number = delta / this.getAppendSpeed;
        this.appearTick = Math.min(this.appearTick += factor, 1.1);
        if (this.appearTick > 0.5) {
            this.fadeTick = Math.min(this.fadeTick += factor, 1.1);
        }
        if (this.currentMaterial !== null) {
            this.currentMaterial.uniforms.fadeFactor.value = this.getFadeFactor();
            this.currentMaterial.uniforms.appearFactor.value = this.getAppearFactor();
        }
    }

    public shouldRedraw() {
        return this.fadeTick >= 1.0;
    }

    public static fontParams(font: any): TextGeometryParameters {
        return {
            font: font,
            size: 18,
            height: 5,
            curveSegments: 1
        }
    }

    public get getMaterial(): ThreeJs.ShaderMaterial | null {
        return this.currentMaterial;
    }

    public get getMesh(): ThreeJs.Mesh | null {
        return this.currentMesh;
    }

    public removeFromScene(): void {
        if (this.currentMesh !== null) {
            this.scene.remove(this.currentMesh as ThreeJs.Mesh);
            this.currentTextGeometry?.dispose();
            this.currentMaterial?.dispose();
        }
    }

    public addToScene(): void {
        if (this.currentMesh !== null) {
            this.scene.add(this.currentMesh as ThreeJs.Mesh);
        }
    }

    public getFadeFactor(): number {
        return this.fadeTick;
    }

    public getAppearFactor(): number {
        return this.appearTick;
    }

    private constructGeometries() {
        this.removeFromScene();
        new FontLoader().load('/assets/img/font.json', (font) => {
            this.currentTextGeometry = new TextGeometry(this.conveyor.getGenString(), StringRenderMesh.fontParams(font));
            this.currentMaterial = new ThreeJs.ShaderMaterial({
                vertexShader: vTextShader,
                fragmentShader: fTextShader,
                uniforms: {
                    appearFactor: { value: 0 },
                    fadeFactor: { value: 0 },
                    meshLength: { value: 0 }
                }    
            });
            this.currentMesh = new ThreeJs.Mesh(this.currentTextGeometry, this.currentMaterial);
            this.currentTextGeometry.computeBoundingBox();
            this.meshLength = (this.currentTextGeometry.boundingBox as ThreeJs.Box3).max.x - (this.currentTextGeometry.boundingBox as ThreeJs.Box3).min.x;
            let offset: number = getWinHeight() - (MaxRenderStrokes * RenderCharMaxHeight * 2.0);
            this.currentMesh.position.set(0, (this.id * (RenderCharMaxHeight * 2.0)) + offset, 0);
            this.currentMaterial.uniforms.meshLength.value = this.meshLength;
            this.addToScene();
        });
    }

    public redraw(): void {
        this.constructGeometries();
        this.fadeTick = 0;
        this.appearTick = 0;
        this.appendSpeed = Utils.getRandomNum(12, 18);
    }
}

class StringConveyor {
    public static generateRandomChar(): string {
        return Utils.getRandomNum(0, 2) == 0 ? '1' : '0';
    }

    public getGenString(): string {
        const genF: any = this.genString();
        return genF();
    }

    private genString(): () => string {
        let generatedString: string = "";
        return (): string => {
            let size: number = (getWinWidth()) / RenderCharMaxWidth;
            while (true) {
                generatedString += StringConveyor.generateRandomChar();
                if (generatedString.length > (size * (0.8 + (5 - Utils.getRandomNum(0, 10)) * 0.01))) {
                    break;
                }
            }
            return generatedString;
        }
    }
}