import { expect } from "chai";
import { SceneDataDifference } from "./scene-difference-generator";

describe("Differences finder", () => {
    // @ts-ignore a enlever
    let sceneDataDifference: SceneDataDifference;

    beforeEach(() => {
        sceneDataDifference = new SceneDataDifference();
    });
    it("test bidon", () => {
        expect(true).to.equal(true);
    });
});
