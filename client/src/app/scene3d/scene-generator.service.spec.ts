import { TestBed } from "@angular/core/testing";

import * as THREE from "three";
import { SceneGeneratorService } from "./scene-generator.service";

describe("SceneGeneratorService", () => {
    let sceneGeneratorService: SceneGeneratorService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SceneGeneratorService],
        });
        sceneGeneratorService = TestBed.get(SceneGeneratorService);
    });

    it("should be created", () => {
        expect(sceneGeneratorService).toBeTruthy();
    });
    it("should return a scene object", () => {
        const nGeometry: number = 1;
        expect(sceneGeneratorService.createScene(nGeometry).type).toBe(new THREE.Scene().type);
    });
});
