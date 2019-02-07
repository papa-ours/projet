import { TestBed } from "@angular/core/testing";

import * as THREE from "three";
import { GeometryGeneratorService } from "./geometry-generator.service";

describe("GeometryGeneratorService", () => {
    let geometryGeneratorService: GeometryGeneratorService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeometryGeneratorService],
        });
        geometryGeneratorService = TestBed.get(GeometryGeneratorService);
    });

    it("should be created", () => {
        expect(geometryGeneratorService).toBeTruthy();
    });
    it("should return a cube geometry on create cube", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createCube(size, material).geometry.type).toBe(new THREE.BoxGeometry().type);
    });
    it("should be the same material as expected in dependency on create cube", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createCube(size, material).material).toBe(material);
    });
    /*it("should be the same size as expected in dependency on create cube", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createCube(size, material).geometry).toBe();
    });*/
    it("should return a cube geometry on create sphere", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createSphere(size, material).geometry.type).toBe(new THREE.SphereGeometry().type);
    });
    it("should be the same material as expected in dependency on create shpere", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createSphere(size, material).material).toBe(material);
    });
});
