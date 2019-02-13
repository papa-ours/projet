import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { Vector } from "../../../../common/communication/position";
import { SceneDataGeneratorService } from "./scene-data-generator";

@injectable()
export class SceneDataDifference {
    public constructor(private sceneDataGeneratorService: SceneDataGeneratorService) { }

    public addGeometryData(geometryDataDifference: GeometryData[]): void {
       const color: number = this.sceneDataGeneratorService.getRandomColor();
       const position: Vector = this.sceneDataGeneratorService.getRandomPosition();
       const rotation: Vector = this.sceneDataGeneratorService.getRandomRotation();
       const size: number = this.sceneDataGeneratorService.getRandomSize();
       geometryDataDifference.push({position: position , rotation: rotation, size: size, color: color, isModified: true});
    }
    public getDifference(geometryData: GeometryData[]): GeometryData[] {
        // create a copy of object
        const geometryDataDifference: GeometryData[] = geometryData.map((data: GeometryData) => data);
        this.addGeometryData(geometryDataDifference);

        return geometryDataDifference;
    }
}
