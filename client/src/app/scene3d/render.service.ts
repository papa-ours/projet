import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RandomGeometryService } from "./random-geometry.service";
import { RandomNumber } from "./random-number.util";

// import Stats = require('stats.js');

@Injectable()
export class RenderService {

    private container: HTMLDivElement;

    private camera: THREE.PerspectiveCamera;

    private shapes: THREE.Mesh[] = [];

    private renderer: THREE.WebGLRenderer;

    private scene: THREE.Scene;

    private cameraZ: number = 400;

    private fieldOfView: number = 70;

    private nearClippingPane: number = 1;

    private farClippingPane: number = 1000;

    public rotationSpeedX: number = 0.005;

    public rotationSpeedY: number = 0.01;

    private readonly GEOMETRY_SIZE: number = 65;

    private randomNumber: RandomNumber = new RandomNumber();

    public constructor(private randomGeometryService: RandomGeometryService) { }
    public createRandomShape(): void {
        // const MIN_SHAPE: number = 10;
        // const MAX_SHAPE: number = 200;
        const numberOfShapes: number = 200; // this.randomNumber.randomInteger(MIN_SHAPE, MAX_SHAPE);
        for (let i: number = 0; i < numberOfShapes; i++) {
            const color: number = this.randomNumber.randomColor();
            const size: number = this.randomNumber.randomScale(this.GEOMETRY_SIZE);
            const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.7,
                roughness: 0.2,
            });
            const randomShape: THREE.Mesh = this.randomGeometryService.getRandomShape(size, material);
            this.shapes.push(randomShape);
            this.scene.add(randomShape);
        }
    }
    private createScene(): void {
        /* Scene */
        this.scene = new THREE.Scene();

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

    public initialize(container: HTMLDivElement, rotationX: number, rotationY: number): void {
        this.container = container;
        this.rotationSpeedX = rotationX;
        this.rotationSpeedY = rotationY;

        this.createScene();
        this.changeBackgroundScene();
        this.createRandomShape();
        this.addLight();
        this.startRenderingLoop();
    }
}
