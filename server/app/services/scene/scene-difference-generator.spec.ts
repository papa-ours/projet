import { expect } from "chai";
import { GeometryData, Modification, ModificationType } from "../../../../common/communication/geometry";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { SceneDataDifferenceService } from "./scene-difference-generator";

describe("SceneDataDifference", () => {

    let sceneDataDifference: SceneDataDifferenceService;
    let sceneDataGeneratorService: SceneDataGeneratorService;

    beforeEach(() => {
        sceneDataDifference = new SceneDataDifferenceService(new SceneDataGeneratorService());
        sceneDataGeneratorService = new SceneDataGeneratorService();
    });

    it("should have a greater length on addGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getRandomGeometryData()];
        const lenghtBeforeAdd: number = geometryData.length;
        // call private method because non deterministic behavior
        sceneDataDifference["addGeometryData"](geometryData, 0);
        const lenghtAfterAdd: number = geometryData.length;
        expect(lenghtAfterAdd).to.be.greaterThan(lenghtBeforeAdd);
    });

    it("should set proprety is modified to true on addGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getRandomGeometryData()];
        sceneDataDifference["addGeometryData"](geometryData, 0);
        expect(geometryData[geometryData.length - 1].isModified).to.equal(true);
    });

    it("should have a lower length on deleteGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getRandomGeometryData()];
        const lenghtBeforeAdd: number = geometryData.length;
        // call private method because non deterministic behavior
        sceneDataDifference["deleteGeometryData"](geometryData, 0);
        const lenghtAfterAdd: number = geometryData.length;
        expect(lenghtAfterAdd).to.be.lessThan(lenghtBeforeAdd);
    });

    it("should not have the same color after changeColorGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getRandomGeometryData()];
        const colorBefore: number = geometryData[0].color;
        // call private method because non deterministic behavior
        sceneDataDifference["changeColorGeometryData"](geometryData, 0);
        const colorAfter: number = geometryData[0].color;
        expect(colorBefore).to.be.not.equal(colorAfter);
    });

    it("should set proprety is modified to true on changeColorGeometryData", () => {
        const geometryData: GeometryData[] = [sceneDataGeneratorService.getRandomGeometryData()];
        // call private method because non deterministic behavior
        sceneDataDifference["changeColorGeometryData"](geometryData, 0);
        expect(geometryData[geometryData.length - 1].isModified).to.equal(true);
    });

    it("should not change the geometry data injected it should make a copie instead", () => {
        const minObject: number = 10;
        const geometryData: GeometryData[] = new Array(minObject);
        geometryData.fill(sceneDataGeneratorService.getRandomGeometryData());
        const modifications: Modification[] =
        [{type: ModificationType.ADD, isActive: true},
         {type: ModificationType.DELETE, isActive: true},
         {type: ModificationType.CHANGE_COLOR, isActive: true},
        ];
        expect(sceneDataDifference.getDifference(geometryData, modifications)).to.be.not.equal(geometryData);
    });

});
