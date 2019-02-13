import { expect } from "chai";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDataDifferenceService } from "./scene-difference-generator";

describe("SceneDataDifference", () => {
    // @ts-ignore a enlever
    let sceneDataDifference: SceneDataDifferenceService;
    let sceneDataGeneratorService: SceneDataGeneratorService;
    beforeEach(() => {
        sceneDataDifference = new SceneDataDifferenceService();
        sceneDataGeneratorService = new SceneDataGeneratorService();
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
    it("should set proprety is modified to true on changeColorGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        sceneDataDifference.changeColorGeometryData(geometryData, 0);
        expect(geometryData[geometryData.length - 1].isModified).to.equal(true);
    });
    it("should not change the geometry data injected it should make a copie instead", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getGeometryData()];
        expect(sceneDataDifference.getDifference(geometryData)).to.be.not.equal(geometryData);
    });
});
