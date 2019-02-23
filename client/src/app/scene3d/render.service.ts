import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable()
export class RenderService {

    private container: HTMLDivElement;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;

    private readonly cameraZ: number = 400;
    private readonly fieldOfView: number = 45;

    private readonly nearClippingPane: number = 1;
    private readonly farClippingPane: number = 10000;

    public constructor() { }

    private createCamera(): void {
        const aspectRatio: number = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPane,
            this.farClippingPane,
        );
        this.camera.position.z = this.cameraZ;
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

    public initialize(container: HTMLDivElement, scene: THREE.Scene): void {
        this.container = container;
        this.scene = scene;
        this.createCamera();
        this.addLight();
        this.startRenderingLoop();
    }

}
