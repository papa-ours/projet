import { expect } from "chai";
import { SceneData } from "../../../../common/communication/geometry";
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
            expect(scene.modifiedScene).to.not.deep.equal(scene.originalScene);
            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            expect(scene.modifiedScene).to.deep.equal(scene.originalScene);
        });
    });

    describe("addition", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });

        it("should restore object if added", () => {
            scene.modifiedScene.push(sceneDataGeneratorService.getRandomGeometryData());
            const position: VectorInterface = scene.modifiedScene[scene.modifiedScene.length - 1].position;
            sceneDifferenceRestoration = new SceneDifferenceRestorationService(scene);
            expect(scene.modifiedScene).to.not.deep.equal(scene.originalScene);
            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            expect(scene.modifiedScene).to.deep.equal(scene.originalScene);
        });
    });

    describe("color change", () => {
        beforeEach(() => {
            scene.modifiedScene = DeepCloner.clone(scene.originalScene);
        });

        it("should restore object if deleted", () => {
            const position: VectorInterface = scene.modifiedScene[0].position;
            scene.modifiedScene[0].color = scene.originalScene[0].color + 1;
            sceneDifferenceRestoration = new SceneDifferenceRestorationService(scene);
            expect(scene.modifiedScene).to.not.deep.equal(scene.originalScene);
            scene = sceneDifferenceRestoration.getSceneAfterDifferenceUpdate(position);
            expect(scene.modifiedScene).to.deep.equal(scene.originalScene);

        });
    });
});
