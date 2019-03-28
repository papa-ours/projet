import { expect } from "chai";
import { SceneData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeepCloner } from "../utils/deep-cloner";
import { Scene } from "./scene";
import { SceneDataGeneratorService } from "./scene-data-generator";

describe("Scene", () => {
    const sizeOfScene: number = 10;
    const sceneDataGeneratorService: SceneDataGeneratorService = new SceneDataGeneratorService();
    const sceneData: SceneData = {
        name: "test",
        originalScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        modifiedScene: sceneDataGeneratorService.getSceneData(sizeOfScene),
        type: SceneType.GEOMETRIC,
    };

    describe("color change", () => {
        beforeEach(() => {
            sceneData.modifiedScene = DeepCloner.clone(sceneData.originalScene);
        });

        it("should detect a color change", () => {
            const position: VectorInterface = sceneData.modifiedScene[0].position;
            sceneData.modifiedScene[0].color = sceneData.originalScene[0].color + 1;
            const result: boolean = Scene.fromSceneData(sceneData).isColorChangeAtPosition(position);
            expect(result).to.equal(true);
        });
    });
});
