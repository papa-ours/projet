import { Injectable } from "@angular/core";
import * as THREE from "three";
import { RandomGeometryService } from "./random-geometry.service";
import { RandomNumber } from "./random-number.util";

@Injectable({
    providedIn: "root",
})
export class SceneGeneratorService {
    private backgroundColor: number = 0x515151;
    private randomNumber: RandomNumber = new RandomNumber();
    private GEOMETRY_BASE_SIZE: number = 65;

    public constructor(private randomGeometryService: RandomGeometryService) { }

    private changeBackgroundScene(scene: THREE.Scene): void {
        scene.background = new THREE.Color(this.backgroundColor);
    }
    private addGeometry(numberOfShapes: number, scene: THREE.Scene ): void {
        for (let i: number = 0; i < numberOfShapes; i++) {
            const color: number = this.randomNumber.randomColor();
            const size: number = this.randomNumber.randomScale(this.GEOMETRY_BASE_SIZE);
            const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.7,
                roughness: 0.2,
            });
            const randomShape: THREE.Mesh = this.randomGeometryService.getRandomShape(size, material);
            scene.add(randomShape);
        }
    }
    public createScene(numberOfShapes: number): THREE.Scene {
        const scene: THREE.Scene = new THREE.Scene();
        this.changeBackgroundScene(scene);
        this.addGeometry(numberOfShapes, scene);

        return scene;
    }
}
