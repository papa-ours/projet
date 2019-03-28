import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable()
export class RenderService {

    private container: HTMLDivElement;
    public camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;

    private readonly CAMERA_Z: number = 400;
    private readonly FIELD_OF_VIEW: number = 45;

    private readonly NEAR_CLIPPING_PANE: number = 1;
    private readonly FAR_CLIPPING_PANE: number = 5000;

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

    private setupRenderingLoop(): void {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

        this.container.appendChild(this.renderer.domElement);
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

    private createSpotLight(height: number, intensity: number, color: number): THREE.SpotLight {
        const spotLight: THREE.SpotLight = new THREE.SpotLight(color, intensity);
        spotLight.position.set(0, height, 0);
        spotLight.lookAt(new THREE.Vector3(0, 0, 0));

        return spotLight;
    }
    private addLight(): void {
        const lowIntensity: number = 0.6;
        const highIntensity: number = 2;
        const lightColor: number = 0xFFFFFF;
        const lightHeight: number = 5000;
        this.scene.add(this.createSpotLight( lightHeight, highIntensity, lightColor));
        this.scene.add(new THREE.AmbientLight(lightColor, lowIntensity));
    }

    public initialize(container: HTMLDivElement, scene: THREE.Scene): void {
        this.container = container;
        this.scene = scene;
        this.createCamera();
        this.addLight();
        this.setupRenderingLoop();
        this.render();
    }

    public reInitialize(container: HTMLDivElement, scene: THREE.Scene): void {
        this.container = container;
        this.scene = scene;
        this.addLight();
        this.setupRenderingLoop();
    }
}
