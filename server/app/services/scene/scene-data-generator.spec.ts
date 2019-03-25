import { expect } from "chai";
import { VectorInterface } from "../../../../common/communication/vector-interface";
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

    it("should create sceneData if the parameter sizes is defined", () => {
        const nGeometry: number = 10;
        const sizes: number[] = [1, 1, 1];
        expect(sceneDataGeneratorService.getSceneData(nGeometry, sizes).length).to.equal(nGeometry);
    });

    it("Should throw an error if the number of geometry is lower than 10 on getSceneData", () => {
        const nGeometry: number = 3;
        expect(() => sceneDataGeneratorService.getSceneData(nGeometry)).to.throw("Number should be beetwen 10 and 200");
    });

    it("should return 0 rotation for x and z axes if y is fixed", () => {
        const result: VectorInterface = sceneDataGeneratorService.getRandomRotation(true);
        expect(result.x === 0 && result.z === 0).to.equal(true);
    });

    it("should return 0 for y position if y is fixed", () => {
        expect(sceneDataGeneratorService.getRandomPosition(true).y).to.equal(0);
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
