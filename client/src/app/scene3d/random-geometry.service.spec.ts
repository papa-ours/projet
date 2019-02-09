import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { RandomGeometryService } from "./random-geometry.service";

describe("RandomGeometryService", () => {
    let randomGeometryService: RandomGeometryService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RandomGeometryService],
        });
        randomGeometryService = TestBed.get(RandomGeometryService);
    });
    it("should be created", () => {
        expect(randomGeometryService).toBeTruthy();
    });
    it("should generate a random shape", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(randomGeometryService.getRandomShape(size, material)).toEqual(jasmine.any(THREE.Mesh));
    });
    it("should generate a random location for the shape", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(randomGeometryService.getRandomShape(size, material).position).not.toEqual(new THREE.Mesh().position);
    });
    it("should generate a random rotation for the shape", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(randomGeometryService.getRandomShape(size, material).rotation).not.toEqual(new THREE.Mesh().rotation);
    });
});
