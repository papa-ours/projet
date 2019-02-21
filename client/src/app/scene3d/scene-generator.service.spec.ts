import { TestBed } from "@angular/core/testing";

import * as THREE from "three";
import { GeometryData } from "../../../../common/communication/geometry";
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
        const geometryData: GeometryData[] = [{
            position: { x: 0 , y: 0 , z: 0 },
            rotation: { x: 0 , y: 0 , z: 0 },
            size: 30,
            color: 0,
            type: 0,
            isModified: false,
        }];
        expect(sceneGeneratorService.createScene(geometryData).type).toBe(new THREE.Scene().type);
    });
});
