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
    it("should generate a random geometry", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(randomGeometryService.create(size, material)).toEqual(jasmine.any(THREE.Mesh));
    });
});
