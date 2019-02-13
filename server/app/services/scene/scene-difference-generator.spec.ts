import { expect } from "chai";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDataDifference } from "./scene-difference-generator";

describe("Differences finder", () => {
    // @ts-ignore a enlever
    let sceneDataDifference: SceneDataDifference;

    beforeEach(() => {
        sceneDataDifference = new SceneDataDifference( new SceneDataGeneratorService());
    });
    it("test bidon", () => {
        expect(true).to.equal(true);
    });
});
