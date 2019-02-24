import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryData } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "./geometry-factory.service";

@Injectable({
    providedIn: "root",
})
export class SceneGeneratorService {
    private readonly backgroundColor: number = 0x515151;
    private scene: THREE.Scene;
    public constructor(private geometryFactoryService: GeometryFactoryService) { }

    private changeBackgroundScene(): void {
        this.scene.background = new THREE.Color(this.backgroundColor);
    }
    private addGeometry(sceneData: GeometryData[]): void {
        for (const shape of sceneData) {
            const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
                color: shape.color,
                metalness: 0.7,
                roughness: 0.2,
            });
            const randomShape: THREE.Mesh = this.geometryFactoryService.createShape(shape.size, material, shape.type);
            randomShape.rotation.set(shape.rotation.x, shape.rotation.y, shape.rotation.z);
            randomShape.position.set(shape.position.x, shape.position.y, shape.position.z);
            this.scene.add(randomShape);
        }
    }
    public createScene(sceneData: GeometryData[]): THREE.Scene {
        this.scene = new THREE.Scene();
        this.changeBackgroundScene();
        this.addGeometry(sceneData);

        return this.scene;
    }
}
