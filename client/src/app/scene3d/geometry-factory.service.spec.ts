import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { GeometryType } from "../../../../common/communication/geometry";
import { GeometryFactoryService } from "./geometry-factory.service";

describe("GeometryFactoryService", () => {
    let geometryFactoryService: GeometryFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeometryFactoryService],
        });
        geometryFactoryService = TestBed.get(GeometryFactoryService);
    });

    it("should be created", () => {
        expect(geometryFactoryService).toBeTruthy();
    });

    it("should generate a cube if GeometryType is cube", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(geometryFactoryService.createShape(size, material, GeometryType.CUBE).geometry.type)
            .toEqual(new THREE.BoxGeometry().type);
    });

    it("should generate a sphere if GeometryType is sphere", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(geometryFactoryService.createShape(size, material, GeometryType.SPHERE).geometry.type)
            .toEqual(new THREE.SphereGeometry().type);
    });

    it("should generate a cone if GeometryType is cone", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(geometryFactoryService.createShape(size, material, GeometryType.CONE).geometry.type)
            .toEqual(new THREE.ConeGeometry().type);
    });

    it("should generate a cylinder if GeometryType is cylinder", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(geometryFactoryService.createShape(size, material, GeometryType.CYLINDER).geometry.type)
            .toEqual(new THREE.CylinderGeometry().type);
    });

    it("should generate a pyramid if GeometryType is pyramid", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(geometryFactoryService.createShape(size, material, GeometryType.PYRAMID).geometry.type)
            .toEqual(new THREE.TetrahedronGeometry().type);
    });

});
