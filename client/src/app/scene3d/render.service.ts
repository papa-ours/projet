import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable()
export class RenderService {

    private container: HTMLDivElement;
    public camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public deltaX: number = 0;
    public deltaZ: number = 0;

    private readonly CAMERA_Z: number = 400;
    private readonly FIELD_OF_VIEW: number = 45;

    private readonly NEAR_CLIPPING_PANE: number = 1;
    private readonly FAR_CLIPPING_PANE: number = 10000;

    private createCamera(): void {
        const aspectRatio: number = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            this.FIELD_OF_VIEW,
            aspectRatio,
            this.NEAR_CLIPPING_PANE,
            this.FAR_CLIPPING_PANE,
        );
        this.camera.position.z = this.CAMERA_Z;
    }

    private getAspectRatio(): number {
        return this.container.clientWidth / this.container.clientHeight;
    }

    private startRenderingLoop(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.container.appendChild(this.renderer.domElement);
        this.render();
    }

    private render(): void {
        requestAnimationFrame(() => this.render());
        this.camera.translateX(this.deltaX);
        this.camera.translateZ(this.deltaZ);
        this.renderer.render(this.scene, this.camera);
    }

    public onResize(): void {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    private addLight(): void {
        const lowIntensity: number = 0.3;
        const highIntensity: number = 2;
        const lightColor: number = 0xFFFFFF;
        this.scene.add(this.camera);
        this.scene.add(new THREE.AmbientLight(lightColor, lowIntensity));
        this.camera.add(new THREE.PointLight(lightColor, highIntensity));
    }

    private addSceneLight(): void {
        const lowIntensity: number = 0.3;
        const lightColor: number = 0xFFFFFF;
        this.scene.add(this.camera);
        this.scene.add(new THREE.AmbientLight(lightColor,lowIntensity));
    }

    public initialize(container: HTMLDivElement, scene: THREE.Scene): void {
        this.container = container;
        this.scene = scene;
        this.createCamera();
        this.addLight();
        this.startRenderingLoop();
    }

    public reInitialize(container: HTMLDivElement, scene: THREE.Scene): void {
        this.container = container;
        this.scene = scene;
        this.addSceneLight();
        this.startRenderingLoop();
    }

    public setDeltaZ(z: number): void{
        this.deltaZ = z;
    }

    public setDeltaX(x: number): void{
        this.deltaX = x;
    }

    public rotateCameraY(y: number): void{
        this.camera.rotateY(y * Math.PI / 3600);
    }

    public rotateCameraX(x: number): void{
        this.camera.rotateX(x * Math.PI / 3600);
    }
}
