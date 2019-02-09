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
    // cube
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
    // sphere
    it("should return a shpere geometry on create sphere", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createSphere(size, material).geometry.type).toBe(new THREE.SphereGeometry().type);
    });
    it("should be the same material as expected in dependency on create sphere", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createSphere(size, material).material).toBe(material);
    });
    // cone
    it("should return a cone geometry on create cone", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createCone(size, material).geometry.type).toBe(new THREE.SphereGeometry().type);
    });
    it("should be the same material as expected in dependency on create cone", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createCone(size, material).material).toBe(material);
    });
    // clylinder
    it("should return a cylender geometry on create cylinder", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createCylinder(size, material).geometry.type).toBe(new THREE.SphereGeometry().type);
    });
    it("should be the same material as expected in dependency on create cylinder", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createCylinder(size, material).material).toBe(material);
    });
    // pyramid
    it("should return a Tetrahedron geometry on create pyramid", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
        expect(geometryGeneratorService.createPyramid(size, material).geometry.type).toBe(new THREE.TetrahedronGeometry().type);
    });
    it("should be the same material as expected in dependency on create pyramid", () => {
        const size: number = 100;
        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xFF4256});
        expect(geometryGeneratorService.createPyramid(size, material).material).toBe(material);
    });
});
