import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";

@injectable()
export class SceneDataDifference {
    public constructor(private sceneDataGeneratorService: SceneDataGeneratorService) { }

    public addGeometryData(geometryDataDifference: GeometryData[]): GeometryData[] {
        geometryDataDifference.push(this.sceneDataGeneratorService.getGeometryData());

        return geometryDataDifference;
    }
    public deleteGeometryData(geometryDataDifference: GeometryData[], index: number): GeometryData[] {
        const numberOfDeletion: number = 1;
        geometryDataDifference.splice(index, numberOfDeletion);

        return geometryDataDifference;
    }
    public getDifference(geometryData: GeometryData[]): GeometryData[] {
        // create a copy of object
        let geometryDataDifference: GeometryData[] = geometryData.map((data: GeometryData) => data);
        geometryDataDifference = this.addGeometryData(geometryDataDifference);
        const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
        geometryDataDifference = this.deleteGeometryData(geometryDataDifference, randomIndex);

        return geometryDataDifference;
    }
}
