import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

@injectable()
export class SceneDifferenceCheckerService {

    private differenceSet: GeometryData[];

    public constructor(scene: SceneData) {
       this.differenceSet = this.getSetDifference(scene.originalScene, scene.modifiedScene);
    }

    private isDifferenteFromCollection(newGeometry: GeometryData, collection: GeometryData[]): boolean {
        for (const geometry of collection) {
            if (Geometry.fromGeometryData(geometry).isEqual(newGeometry)) {
                return false;
            }
        }

        return true;
    }

    private getSetDifference(scene1: GeometryData[], scene2: GeometryData[]): GeometryData[] {
        const diffScene1: GeometryData[] = scene1.filter((geometry: GeometryData) => this.isDifferenteFromCollection(geometry, scene2));
        const diffScene2:  GeometryData[] = scene2.filter((geometry: GeometryData) => this.isDifferenteFromCollection(geometry, scene1));

        return [...diffScene1, ...diffScene2];
    }

    public checkDifference(position: VectorInterface): boolean {

        return this.differenceSet.some((geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position));
    }
}
