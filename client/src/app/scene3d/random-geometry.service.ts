import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryGeneratorService } from "./geometry-generator.service";
import { RandomNumber } from "./random-number.util";
import { SKYBOX_MAX, SKYBOX_MIN } from "./skybox";
@Injectable({
    providedIn: "root",
})
export class RandomGeometryService {
    private geometryGeneratorService: GeometryGeneratorService = new GeometryGeneratorService() ;
    private functionList: Function[] = [];
    private randomNumber: RandomNumber = new RandomNumber();
    public constructor() {
        this.functionList.push(this.geometryGeneratorService.createSphere);
        this.functionList.push(this.geometryGeneratorService.createCube);
        this.functionList.push(this.geometryGeneratorService.createCone);
        this.functionList.push(this.geometryGeneratorService.createCylinder);
        this.functionList.push(this.geometryGeneratorService.createPyramid);
    }
    private applyRandomPosition(shape: THREE.Mesh): void {
        shape.position.setX(this.randomNumber.randomInteger(SKYBOX_MIN.x, SKYBOX_MAX.x));
        shape.position.setY(this.randomNumber.randomInteger(SKYBOX_MIN.y, SKYBOX_MAX.y));
        shape.position.setZ(this.randomNumber.randomInteger(SKYBOX_MIN.z, SKYBOX_MAX.z));
    }
    public getRandomShape(size: number, material: THREE.Material): THREE.Mesh {
        const functionSelector: number = Math.floor(Math.random() * this.functionList.length);
        const randomShape: THREE.Mesh = this.functionList[functionSelector](size, material);
        this.applyRandomPosition(randomShape);

        return randomShape;
    }
}
