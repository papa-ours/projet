import { expect } from "chai";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDifferenceCheckerService } from "./scene-difference-checker";

describe("SceneDifferenceChecker", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService;
    const scene: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
    };
    const sceneDifferenceChecker: SceneDifferenceCheckerService = new SceneDifferenceCheckerService(scene);

    beforeEach(() => {
        scene.modifiedScene = scene.originalScene;
    });

    describe("deletion", () => {
        it("should return true if object is deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            scene.modifiedScene.slice(0, 1);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(true);
        });
        it("should return false if object is not deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(true);
        });
    });

});
