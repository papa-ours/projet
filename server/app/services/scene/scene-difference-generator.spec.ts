import { expect } from "chai";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDataDifference } from "./scene-difference-generator";

describe("SceneDataDifference", () => {
    // @ts-ignore a enlever
    let sceneDataDifference: SceneDataDifference;
    let sceneDataGeneratorService: SceneDataGeneratorService;
    beforeEach(() => {
        sceneDataDifference = new SceneDataDifference( new SceneDataGeneratorService());
        sceneDataGeneratorService = new SceneDataGeneratorService()
    });
    it("should have greater length on addGeometry", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        const lenghtBeforeAdd: number = geometryData.length;
        sceneDataDifference.addGeometryData(geometryData);
        const lenghtAfterAdd: number = geometryData.length;
        expect(lenghtAfterAdd).to.be.greaterThan(lenghtBeforeAdd);
    });
    it("should set proprety is modified to true on addGeometry", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        sceneDataDifference.addGeometryData(geometryData);
        expect(geometryData[geometryData.length - 1].isModified).to.equal(true);
    });
});
