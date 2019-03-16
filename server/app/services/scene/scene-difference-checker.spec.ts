import { expect } from "chai";
import { SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeepCloner } from "../utils/deep-cloner";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDifferenceCheckerService } from "./scene-difference-checker";

describe("SceneDifferenceChecker", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService();
    const scene: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
    };
    let sceneDifferenceChecker: SceneDifferenceCheckerService;

    describe("deletion", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object is not deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(false);
        });

        it("should return true if object is deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            scene.modifiedScene.splice(0, 1);
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(true);
        });
    });

    describe("addition", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object is not added at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(false);
        });

        it("should return true if object is added at the position specified", () => {
            scene.modifiedScene.push(sceneDataGeneratorService.getRandomGeometryData());
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            const position: VectorInterface = scene.modifiedScene[scene.modifiedScene.length - 1].position;
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(true);
        });
    });

    describe("color Change", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object has the same color at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(false);
        });

        it("should return true if object has a differente color at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            scene.modifiedScene[0].color = scene.originalScene[0].color + 1 ;
            sceneDifferenceChecker = new SceneDifferenceCheckerService(scene);
            expect(sceneDifferenceChecker.checkDifference(position)).to.equal(true);
        });
    });
});
