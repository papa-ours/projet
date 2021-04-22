import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { GeometryData } from "../../../../common/communication/geometry";
import { ThematicObjectGeneratorService } from "./thematic-object-generator.service";
import { ThematicSceneGeneratorService } from "./thematic-scene-generator.service";

describe("ThematicSceneGeneratorService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: ThematicSceneGeneratorService = TestBed.get(ThematicSceneGeneratorService);
        expect(service).toBeTruthy();
    });

    it("should return a scene object", async () => {
        const sceneService: ThematicSceneGeneratorService = TestBed.get(ThematicSceneGeneratorService);
        const objectService: ThematicObjectGeneratorService = TestBed.get(ThematicObjectGeneratorService);
        objectService.waitForObjects().then(async () => {
            const geometryData: GeometryData[] = [{
                position: { x: 0 , y: 0 , z: 0 },
                rotation: { x: 0 , y: 0 , z: 0 },
                size: {x: 30, y: 30, z: 30},
                color: 0,
                type: 0,
                isModified: false,
                thematicObjectType: 0,
            }];
            expect((await sceneService.createScene(geometryData)).type).toBe(new THREE.Scene().type);
        })
        .catch((error: Error) => console.error(error.message));
    });
});
