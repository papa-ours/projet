import { Injectable } from "@angular/core";
import * as THREE from "three";
import { GeometryType } from "../../../../common/communication/geometry";
import { GeometryGeneratorService } from "./geometry-generator.service";

type GeometryCreator = (size: number, material: THREE.Material) => THREE.Mesh;

@Injectable({
    providedIn: "root",
})
export class GeometryFactoryService {

    private geometryGeneratorService: GeometryGeneratorService;
    private geometryTypeTofunction: Map<GeometryType, GeometryCreator>;

    public constructor() {
        this.geometryGeneratorService = new GeometryGeneratorService();
        this.geometryTypeTofunction = new Map();
        this.geometryTypeTofunction.set(GeometryType.SPHERE , this.geometryGeneratorService.createSphere);
        this.geometryTypeTofunction.set(GeometryType.CUBE, this.geometryGeneratorService.createCube);
        this.geometryTypeTofunction.set(GeometryType.CONE, this.geometryGeneratorService.createCone);
        this.geometryTypeTofunction.set(GeometryType.CYLINDER, this.geometryGeneratorService.createCylinder);
        this.geometryTypeTofunction.set(GeometryType.PYRAMID, this.geometryGeneratorService.createPyramid);
    }
    public createShape(size: number, material: THREE.Material, type: GeometryType): THREE.Mesh {
        return (this.geometryTypeTofunction.get(type) as GeometryCreator)(size, material);
    }
}
