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
    private geometryCreatorMap: Map<GeometryType, GeometryCreator>;

    public constructor() {
        this.geometryGeneratorService = new GeometryGeneratorService();
        this.geometryCreatorMap = new Map();
        this.geometryCreatorMap.set(GeometryType.SPHERE , this.geometryGeneratorService.createSphere);
        this.geometryCreatorMap.set(GeometryType.CUBE, this.geometryGeneratorService.createCube);
        this.geometryCreatorMap.set(GeometryType.CONE, this.geometryGeneratorService.createCone);
        this.geometryCreatorMap.set(GeometryType.CYLINDER, this.geometryGeneratorService.createCylinder);
        this.geometryCreatorMap.set(GeometryType.PYRAMID, this.geometryGeneratorService.createPyramid);
    }
    public createShape(size: number, material: THREE.Material, type: GeometryType): THREE.Mesh {
        return (this.geometryCreatorMap.get(type) as GeometryCreator)(size, material);
    }
}
