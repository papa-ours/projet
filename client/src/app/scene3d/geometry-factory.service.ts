import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryType } from "../../../../common/communication/geometry";
import { GeometryGeneratorService } from "./geometry-generator.service";
@Injectable({
    providedIn: "root",
})
export class GeometryFactoryService {
    private geometryGeneratorService: GeometryGeneratorService = new GeometryGeneratorService() ;
    private geometryTypeTofunction: Map<GeometryType, Function>;

    public constructor() {
        this.geometryTypeTofunction = new Map();
        this.geometryTypeTofunction.set(GeometryType.SPHERE , this.geometryGeneratorService.createSphere);
        this.geometryTypeTofunction.set(GeometryType.CUBE, this.geometryGeneratorService.createCube);
        this.geometryTypeTofunction.set(GeometryType.CONE, this.geometryGeneratorService.createCone);
        this.geometryTypeTofunction.set(GeometryType.CYLINDER, this.geometryGeneratorService.createCylinder);
        this.geometryTypeTofunction.set(GeometryType.PYRAMID, this.geometryGeneratorService.createPyramid);
    }
    public createShape(size: number, material: THREE.Material, type: GeometryType): THREE.Mesh {
        const geometry: Function =  this.geometryTypeTofunction.get(type) as Function;

        return geometry(size, material);
    }
}
