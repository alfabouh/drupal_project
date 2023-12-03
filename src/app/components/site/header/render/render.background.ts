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
let ticks: number = 0;
let RenderCharMaxWidth: number = 0;
let RenderCharMaxHeight: number = 0;
let MaxRenderStrokes: number = 0;
let maxRenders = 256;
let strMesh: StringRenderMesh[] = new Array<StringRenderMesh>(maxRenders);
let WIDTH_PRC: number = 1.0;
let HEIGHT_PRC: number = 0.86;

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
            if (ticks % e.getAppendSpeed == 0) {
                e.addSymbol();
            }
            if (e.getFadeFactor() >= 0) {
                e.tick();
                if (e.shouldRedraw()) {
                    e.redraw();
                }
            }
        }
    }
    ticks += 1;
}

class StringRenderMesh {
    private currentString: string = "";
    private strCon: string = "";
    private conveyor: StringConveyor;
    private currentMesh: ThreeJs.Mesh | null = null;
    private currentTextGeometry: TextGeometry | null = null;
    private scene: ThreeJs.Object3D;
    private currentMaterial: ThreeJs.ShaderMaterial | null = null;
    private fadeTick = -1;
    private id: number;
    private appendSpeed: number;

    constructor(id: number, scene: ThreeJs.Object3D, strCon: StringConveyor) {
        this.conveyor = strCon;
        this.scene = scene;
        this.constructGeometries();
        this.id = id;
        this.appendSpeed = Utils.getRandomNum(8, 14);
    }

    public get getAppendSpeed(): number {
        return this.appendSpeed;
    }

    public tick(): void {
        if (this.fadeTick < 0) {
            this.fadeTick = 0;
        } else {
            let deltaSpeed: number = 1 / (this.appendSpeed);
            this.fadeTick += (1 / (this.strCon.length)) * deltaSpeed;
        }
        if (this.currentMaterial !== null) {
            this.currentMaterial.uniforms.fadeFactor.value = this.getFadeFactor();
        }
    }

    public shouldRedraw() {
        return this.fadeTick > 1.0;
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

    public addSymbol(): void {
        if (this.currentString.length !== this.strCon.length) {
            this.currentString += this.strCon.at(this.currentString.length);
        } 
        for (let i: number = 0; i < this.currentString.length * 0.7; i++) {
            if (Utils.getRandomNum(0, 8) == 0) {
                this.currentString = Utils.replaceAt(this.currentString, i, StringConveyor.generateRandomChar());
            }
        }
        let newtextGeometry: TextGeometry | null = null;
        new FontLoader().load('/assets/img/font.json', (font) => {
            if (this.currentMaterial !== null) {
                this.removeFromScene();
                let fparam: TextGeometryParameters = StringRenderMesh.fontParams(font);
                newtextGeometry = new TextGeometry(this.currentString as string, fparam);
                newtextGeometry.computeBoundingBox();
                if (this.fadeTick < 0 && this.currentString.length >= this.strCon.length * 0.75) {
                    this.tick();
                }
                this.currentMaterial.uniforms.textLength.value = (newtextGeometry.boundingBox as ThreeJs.Box3).max.x - (newtextGeometry.boundingBox as ThreeJs.Box3).min.x;
                let oldPos: ThreeJs.Vector3 = (this.currentMesh as ThreeJs.Mesh).position;
                this.currentMesh = new ThreeJs.Mesh(newtextGeometry, this.currentMaterial);
                this.currentMesh.position.set(oldPos.x, oldPos.y, oldPos.z);
                this.currentTextGeometry = newtextGeometry;
                this.addToScene();
            }
        });
    }

    private constructGeometries() {
        this.removeFromScene();
        new FontLoader().load('/assets/img/font.json', (font) => {
            this.currentTextGeometry = new TextGeometry("", StringRenderMesh.fontParams(font));
            this.currentMaterial = new ThreeJs.ShaderMaterial({
                vertexShader: vTextShader,
                fragmentShader: fTextShader,
                uniforms: {
                    textLength: { value: 0 },
                    fadeFactor: { value: 0 }
                }    
            });
            this.currentMesh = new ThreeJs.Mesh(this.currentTextGeometry, this.currentMaterial);
            this.replace();
            this.addToScene();
        });
    }

    public redraw(): void {
        this.currentString = "";
        this.constructGeometries();
        this.fadeTick = -1;
    }

    public replace(): void {
        if (this.currentMesh !== null) {
            let startpos: number = getWinWidth() * Utils.getRandomNum(0, 20) * 0.01;
            let offset: number = getWinHeight() - (MaxRenderStrokes * RenderCharMaxHeight * 2.0);
            this.currentMesh.position.set(startpos, (this.id * (RenderCharMaxHeight * 2.0)) + offset, 0);
            this.strCon = this.conveyor.getGenString(startpos);
        }
    }
}

class StringConveyor {
    public static generateRandomChar(): string {
        return Utils.getRandomNum(0, 2) == 0 ? '1' : '0';
    }

    public getGenString(startpos: number): string {
        const genF: any = this.genString(startpos);
        return genF();
    }

    private genString(startpos: number): () => string {
        let generatedString: string = "";
        return (): string => {
            let size: number = (getWinWidth() - startpos) / RenderCharMaxWidth;
            while (true) {
                generatedString += StringConveyor.generateRandomChar();
                if (generatedString.length > size || (generatedString.length > size / 1.5 && Utils.getRandomNum(0, 50) == 0)) {
                    break;
                }
            }
            return generatedString;
        }
    }
}