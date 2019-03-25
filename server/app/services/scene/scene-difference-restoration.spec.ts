import { expect } from "chai";
import { SceneData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeepCloner } from "../utils/deep-cloner";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDifferenceRestorationService } from "./scene-difference-restoration";

describe("SceneDifferenceRestoration", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService();
    let scene: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        type: SceneType.GEOMETRIC,
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
            let modificationIndex: number = scene.modifiedScene.length - 1;
            let originalIndex: number = scene.originalScene.length - 1;
            expect(scene.modifiedScene[modificationIndex].position)
                .to.not.deep.equal(scene.originalScene[originalIndex].position);

            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);

            modificationIndex = scene.modifiedScene.length - 1;
            originalIndex = scene.originalScene.length - 1;
            expect(scene.modifiedScene[modificationIndex].position)
                .to.deep.equal(scene.originalScene[modificationIndex].position);
        });
    });

    describe("addition", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });

        it("should restore object if added at the right position", () => {
            scene.modifiedScene.push(sceneDataGeneratorService.getRandomGeometryData());
            const position: VectorInterface = scene.modifiedScene[scene.modifiedScene.length - 1].position;
            sceneDifferenceRestoration = new SceneDifferenceRestorationService(scene);
            let modificationIndex: number = scene.modifiedScene.length - 1;
            let originalIndex: number = scene.originalScene.length - 1;
            expect(scene.modifiedScene[modificationIndex].position)
                .to.not.deep.equal(scene.originalScene[originalIndex].position);

            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);

            modificationIndex = scene.modifiedScene.length - 1;
            originalIndex = scene.originalScene.length - 1;
            expect(scene.modifiedScene[modificationIndex].position)
                .to.deep.equal(scene.originalScene[modificationIndex].position);
        });
    });

    describe("color change", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });

        it("should restore object if color changed", () => {
            const position: VectorInterface = scene.modifiedScene[0].position;
            scene.modifiedScene[0].color = scene.originalScene[0].color + 1;
            sceneDifferenceRestoration = new SceneDifferenceRestorationService(scene);
            expect(scene.modifiedScene[0].color).to.not.deep.equal(scene.originalScene[0].color);
            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            expect(scene.modifiedScene[0].color).to.deep.equal(scene.originalScene[0].color);
        });
    });

    describe("No change", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });

        it("should not restore if there is no change", () => {
            const index: number = scene.modifiedScene.length - 1;
            const position: VectorInterface = scene.modifiedScene[index].position;
            expect(scene.modifiedScene[index].position).to.deep.equal(scene.originalScene[index].position);
            expect(scene.modifiedScene[index].color).to.deep.equal(scene.originalScene[index].color);
            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            expect(scene.modifiedScene[index].position).to.deep.equal(scene.originalScene[index].position);
            expect(scene.modifiedScene[index].color).to.deep.equal(scene.originalScene[index].color);
        });
    });
});
