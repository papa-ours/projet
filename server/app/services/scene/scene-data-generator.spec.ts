import { expect } from "chai";
import { SceneDataGeneratorService } from "./scene-data-generator";

describe("scenceDataGenerator", () => {
    // @ts-ignore a enlever
    let sceneDataGeneratorService: SceneDataGeneratorService;

    beforeEach(() => {
        sceneDataGeneratorService = new SceneDataGeneratorService();
    });

    it("test bidon", () => {
        expect(true).to.equal(true);
    });
});
