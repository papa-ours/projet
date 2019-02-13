import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";

@injectable()
export class SceneDataDifferenceService {
    private sceneDataGeneratorService: SceneDataGeneratorService;
    public constructor() { this.sceneDataGeneratorService = new SceneDataGeneratorService(); }

    public addGeometryData(geometryDataDifference: GeometryData[]): void {
        geometryDataDifference.push(this.sceneDataGeneratorService.getGeometryData());
        geometryDataDifference[geometryDataDifference.length - 1].isModified = true;
    }
    public deleteGeometryData(geometryDataDifference: GeometryData[], index: number): void {
        const numberOfDeletion: number = 1;
        geometryDataDifference.splice(index, numberOfDeletion);
    }
    public changeColorGeometryData(geometryDataDifference: GeometryData[], index: number): void {
        const newColor: number = this.sceneDataGeneratorService.getRandomColor();
        geometryDataDifference[index].color = newColor;
        geometryDataDifference[index].isModified = true;
    }
    public getDifference(geometryData: GeometryData[]): GeometryData[] {
        // create a copy of object
        const geometryDataDifference: GeometryData[] = JSON.parse(JSON.stringify(geometryData));
        this.addGeometryData(geometryDataDifference);
        const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
        this.deleteGeometryData(geometryDataDifference, randomIndex);

        return geometryDataDifference;
    }
}
