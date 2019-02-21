import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryType } from "../../../../common/communication/geometry";
import { GeometryGeneratorService } from "./geometry-generator.service";
@Injectable({
    providedIn: "root",
})
export class GeometryFactoryService {
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
    public createShape(size: number, material: THREE.Material, type: GeometryType): THREE.Mesh {
        return this.functionList[type](size, material);
    }
}
