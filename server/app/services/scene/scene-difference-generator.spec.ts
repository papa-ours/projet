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
    it("should have a greater length on addGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        const lenghtBeforeAdd: number = geometryData.length;
        sceneDataDifference.addGeometryData(geometryData);
        const lenghtAfterAdd: number = geometryData.length;
        expect(lenghtAfterAdd).to.be.greaterThan(lenghtBeforeAdd);
    });
    it("should set proprety is modified to true on addGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        sceneDataDifference.addGeometryData(geometryData);
        expect(geometryData[geometryData.length - 1].isModified).to.equal(true);
    });
    it("should have a lower length on deleteGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        const lenghtBeforeAdd: number = geometryData.length;
        sceneDataDifference.deleteGeometryData(geometryData, 0);
        const lenghtAfterAdd: number = geometryData.length;
        expect(lenghtAfterAdd).to.be.lessThan(lenghtBeforeAdd);
    });
    it("should not have the same color after changeColorGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        const colorBefore: number = geometryData[0].color;
        sceneDataDifference.changeColorGeometryData(geometryData, 0);
        const colorAfter: number = geometryData[0].color;
        expect(colorBefore).to.be.not.equal(colorAfter);
    });
});
