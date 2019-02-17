import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";

@injectable()
export class SceneDataDifferenceService {
    private sceneDataGeneratorService: SceneDataGeneratorService;
    private readonly MAX_DIFFERENCE: number = 7;
    private functionList: Function [] = [];
    public constructor() {
        this.sceneDataGeneratorService = new SceneDataGeneratorService();
        this.functionList.push(this.addGeometryData);
        this.functionList.push(this.deleteGeometryData);
        this.functionList.push(this.changeColorGeometryData);
    }

    public addGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        geometryDataDifference.push(this.sceneDataGeneratorService.getGeometryData());
        geometryDataDifference[geometryDataDifference.length - 1].isModified = true;
    }
    public deleteGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        const numberOfDeletion: number = 1;
        geometryDataDifference.splice(index, numberOfDeletion);
    }
    public changeColorGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        const newColor: number = this.sceneDataGeneratorService.getRandomColor();
        geometryDataDifference[index].color = newColor;
        geometryDataDifference[index].isModified = true;
    }
    public applyRandomChange(geometryDataDifference: GeometryData[], randomIndex: number): void {
        const randomIndexFunction: number = Math.floor(Math.random() * this.functionList.length);
        this.functionList[randomIndexFunction](geometryDataDifference, randomIndex);
    }
    public getDifference(geometryData: GeometryData[]): GeometryData[] {
        // create a copy of object
        const geometryDataDifference: GeometryData[] = Array.from(geometryData);
        let differenceCounter: number = 0;
        while (differenceCounter < this.MAX_DIFFERENCE) {
            const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
            if (!geometryDataDifference[randomIndex].isModified) {
                this.applyRandomChange(geometryDataDifference, randomIndex);
                differenceCounter++;
            }
        }

        return geometryDataDifference;
    }
}
