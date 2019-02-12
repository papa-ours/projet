import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryGeneratorService } from "./geometry-generator.service";
@Injectable({
    providedIn: "root",
})
export class RandomGeometryService {
    private geometryGeneratorService: GeometryGeneratorService = new GeometryGeneratorService() ;
    private functionList: Function[] = [];
    // private randomNumber: RandomNumber = new RandomNumber();
    public constructor() {
        this.functionList.push(this.geometryGeneratorService.createSphere);
        this.functionList.push(this.geometryGeneratorService.createCube);
        this.functionList.push(this.geometryGeneratorService.createCone);
        this.functionList.push(this.geometryGeneratorService.createCylinder);
        this.functionList.push(this.geometryGeneratorService.createPyramid);
    }
    public getRandomShape(size: number, material: THREE.Material): THREE.Mesh {
        const functionSelector: number = Math.floor(Math.random() * this.functionList.length);

        return this.functionList[functionSelector](size, material);
    }
}
