import { expect } from "chai";
import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { Modification, ModificationType, SceneData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeepCloner } from "../utils/deep-cloner";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDifferenceCheckerService } from "./scene-difference-checker";
import { SceneDataDifferenceService } from "./scene-difference-generator";

describe("SceneDifferenceChecker", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService();
    const scene: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        type: SceneType.GEOMETRIC,
    };
    const sceneDifferenceChecker: SceneDifferenceCheckerService = new SceneDifferenceCheckerService();

    describe("deletion", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object is not deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(false);
        });

        it("should return true if object is deleted at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            scene.modifiedScene.splice(0, 1);
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(true);
        });
    });

    describe("addition", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object is not added at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(false);
        });

        it("should return true if object is added at the position specified", () => {
            scene.modifiedScene.push(sceneDataGeneratorService.getRandomGeometryData());
            const position: VectorInterface = scene.modifiedScene[scene.modifiedScene.length - 1].position;
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(true);
        });
    });

    describe("color Change", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });
        it("should return false if object has the same color at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(false);
        });

        it("should return true if object has a differente color at the position specified", () => {
            const position: VectorInterface = scene.originalScene[0].position;
            scene.modifiedScene[0].color = scene.originalScene[0].color + 1 ;
            expect(sceneDifferenceChecker.checkDifference(scene, position)).to.equal(true);
        });
    });

    describe("differences", () => {
        beforeEach(() => {
            const differenceGenerator: SceneDataDifferenceService = new SceneDataDifferenceService();
            const modifications: Modification[] = [
                {type: ModificationType.ADD, isActive: true},
                {type: ModificationType.CHANGE_COLOR, isActive: true},
                {type: ModificationType.DELETE, isActive: true},
            ];
            scene.modifiedScene = differenceGenerator.getDifference(scene.originalScene, modifications);
        });

        it("should detect the excat number of differences", () => {
            expect(sceneDifferenceChecker.getDifferences(scene).length).to.deep.equal(REQUIRED_DIFFERENCES_1P);
        });
    });
});
