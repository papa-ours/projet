import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { GeometryFactoryService } from "./geometry-factory.service";

describe("RandomGeometryService", () => {
    let randomGeometryService: GeometryFactoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GeometryFactoryService],
        });
        randomGeometryService = TestBed.get(GeometryFactoryService);
    });

    it("should be created", () => {
        expect(randomGeometryService).toBeTruthy();
    });

    it("should generate a random shape", () => {
        const size: number = 100;
        const material: THREE.Material = new THREE.Material();
        expect(randomGeometryService.createShape(size, material, 0)).toEqual(jasmine.any(THREE.Mesh));
    });

});
