import { expect } from "chai";
import { SceneDataGeneratorService } from "./scene-data-generator";

describe("scenceDataGenerator", () => {

    let sceneDataGeneratorService: SceneDataGeneratorService;

    beforeEach(() => {
        sceneDataGeneratorService = new SceneDataGeneratorService();
    });

    it("Should return the same number of geometry as provided in parameters on getSceneData", () => {
        const nGeometry: number = 10;
        expect(sceneDataGeneratorService.getSceneData(nGeometry).length).to.equal(nGeometry);
    });

    it("Should throw an error if the number of geometry is lower than 10 on getSceneData", () => {
        const nGeometry: number = 3;
        expect(() => sceneDataGeneratorService.getSceneData(nGeometry)).to.throw("Number should be beetwen 10 and 200");
    });

    it("Should throw an error if the number of geometry is greater than 200 on getSceneData", () => {
        const nGeometry: number = 201;
        expect(() => sceneDataGeneratorService.getSceneData(nGeometry)).to.throw("Number should be beetwen 10 and 200");
    });

    it("Should not throw an error if the number of geometry is exactly 10 on getSceneData", () => {
        const nGeometry: number = 10;
        expect(() => sceneDataGeneratorService.getSceneData(nGeometry)).to.not.throw("Number should be beetwen 10 and 200");
    });

    it("Should not throw an error if the number of geometry is exactly 200 on getSceneData", () => {
        const nGeometry: number = 200;
        expect(() => sceneDataGeneratorService.getSceneData(nGeometry)).to.not.throw("Number should be beetwen 10 and 200");
    });

});
