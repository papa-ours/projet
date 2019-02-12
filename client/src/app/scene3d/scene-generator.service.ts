import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryMessage } from "../../../../common/communication/geometryMessage";
import { RandomGeometryService } from "./random-geometry.service";

@Injectable({
    providedIn: "root",
})
export class SceneGeneratorService {
    private backgroundColor: number = 0x515151;
    private scene: THREE.Scene = new THREE.Scene();
    public constructor(private randomGeometryService: RandomGeometryService) { }

    private changeBackgroundScene(): void {
        this.scene.background = new THREE.Color(this.backgroundColor);
    }
    private addGeometry(sceneData: GeometryMessage[]): void {
        for (const data of sceneData) {
            const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
                color: data.color,
                metalness: 0.7,
                roughness: 0.2,
            });
            const randomShape: THREE.Mesh = this.randomGeometryService.getRandomShape(data.size, material);
            randomShape.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
            randomShape.position.set(data.position.x, data.position.y, data.position.z);
            this.scene.add(randomShape);
        }
    }
    public createScene(sceneData: GeometryMessage[]): THREE.Scene {
        this.changeBackgroundScene();
        this.addGeometry(sceneData);

        return this.scene;
    }
}
