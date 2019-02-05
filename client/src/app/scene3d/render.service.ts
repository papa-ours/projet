import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RandomGeometryService } from "./random-geometry.service";

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

    public constructor(private randomGeometryService: RandomGeometryService) {}
    private animateShapes(): void {
        for (const shape of this.shapes) {
            shape.rotation.x += this.rotationSpeedX;
            shape.rotation.y += this.rotationSpeedY;
        }
    }
    public createRandomShape(): void {
        const MAX_SHAPE: number = 1;
        for (let i: number = 0; i < MAX_SHAPE; i++) {
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: this.getRandomColor(), wireframe: true });
            const randomShape: THREE.Mesh = new THREE.Mesh(this.randomGeometryService.create(this.getRandomSize()), material);
            this.shapes.push(randomShape);
            this.scene.add(randomShape);
        }
    }
    // TODO : devrais etre dans un autre fichier
    private getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)  + min ) ;
    }
    // TODO : devrais etre dans un autre fichier
    private getRandomSize(): number {
        const MIN_FACTOR: number = 0.5;
        const MAX_FACTOR: number = 1.5;

        return  this.getRandomInteger(MIN_FACTOR * this.GEOMETRY_SIZE, MAX_FACTOR * this.GEOMETRY_SIZE);
    }
    // TODO : devrais etre dans une autre classe
    private getRandomColor(): number {
        const BASE_COLOR: number = 0xFFFFFF;

        return Math.floor(Math.random() * BASE_COLOR);
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
        this.animateShapes();

        this.renderer.render(this.scene, this.camera);
    }

    public onResize(): void {
        this.camera.aspect = this.getAspectRatio();
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    public initialize(container: HTMLDivElement, rotationX: number, rotationY: number): void {
        this.container = container;
        this.rotationSpeedX = rotationX;
        this.rotationSpeedY = rotationY;

        this.createScene();
        this.createRandomShape();
        this.startRenderingLoop();
    }
}
