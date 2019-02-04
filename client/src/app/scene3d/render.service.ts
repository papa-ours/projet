import { Injectable } from "@angular/core";
import * as THREE from "three";
// import Stats = require('stats.js');

@Injectable()
export class RenderService {

  private container: HTMLDivElement;

  private camera: THREE.PerspectiveCamera;

  // private stats: Stats;

  private cube: THREE.Mesh;

  private renderer: THREE.WebGLRenderer;

  private scene: THREE.Scene;

  private cameraZ: number = 400;

  private fieldOfView: number = 70;

  private nearClippingPane: number = 1;

  private farClippingPane: number = 1000;

  public rotationSpeedX: number = 0.005;

  public rotationSpeedY: number = 0.01;

  private animateCube(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private createCube(): void {
    const GEOMETRY_SIZE: number = 200;
    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(GEOMETRY_SIZE, GEOMETRY_SIZE, GEOMETRY_SIZE);

    for (let i = 0; i < geometry.faces.length; i += 2) {
      const hex = Math.random() * 0xffffff;
      geometry.faces[i].color.setHex(hex);
      geometry.faces[i + 1].color.setHex(hex);
    }

    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private createScene(): void {
    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
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
    this.animateCube();

    this.renderer.render(this.scene, this.camera);
    // this.stats.update();
  }

  private initStats(): void {
    // this.stats = new Stats();
    // this.stats.dom.style.position = 'absolute';

    // this.container.appendChild(this.stats.dom);
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
    this.createCube();
    this.initStats();
    this.startRenderingLoop();
  }
}
