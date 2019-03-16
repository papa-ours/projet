import { expect } from "chai";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeepCloner } from "../utils/deep-cloner";
import { Geometry } from "./geometry";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDifferenceRestorationService } from "./scene-difference-restoration";

describe("SceneDifferenceRestoration", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService();
    const scene: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
    };
    let sceneDifferenceRestoration: SceneDifferenceRestorationService;
    describe("deletion", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should restore object if deleted", () => {
            const position: VectorInterface = scene.modifiedScene[scene.modifiedScene.length - 1].position;
            scene.modifiedScene.pop();
            sceneDifferenceRestoration = new SceneDifferenceRestorationService(scene);
            const sceneRestored: SceneData = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            const restoration: GeometryData = sceneRestored.modifiedScene[sceneRestored.modifiedScene.length - 1];
            const result: boolean = Geometry.fromGeometryData(restoration).isEqual(scene.originalScene[scene.originalScene.length - 1]);
            expect(result).to.equal(true);
        });
    });
});
