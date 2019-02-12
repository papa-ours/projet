import { Injectable } from "@angular/core";
import * as THREE from "three";

// import Stats = require('stats.js');

@Injectable()
export class RenderService {

    private container: HTMLDivElement;

    private camera: THREE.PerspectiveCamera;

    private renderer: THREE.WebGLRenderer;

    private scene: THREE.Scene;

    private cameraZ: number = 400;

    private fieldOfView: number = 45;

    private nearClippingPane: number = 1;

    private farClippingPane: number = 10000;

    public constructor() { }

    private createScene(): void {
        /* Scene */

        /* Camera */
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
    private changeBackgroundScene(): void {
        const backgroundColor: number = 0x515151;
        this.scene.background = new THREE.Color(backgroundColor);
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

    public initialize(container: HTMLDivElement, scene: THREE.Scene ): void {
        this.container = container;
        this.scene = scene;
        this.createScene();
        this.changeBackgroundScene();
        this.addLight();
        this.startRenderingLoop();
    }
}
