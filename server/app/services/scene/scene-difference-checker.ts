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

    private isGeometryEqual(geometry1: GeometryData, geometry2: GeometryData): boolean {
        return (geometry1.color === geometry2.color &&
                geometry1.position.x === geometry2.position.x &&
                geometry1.position.y === geometry2.position.y &&
                geometry1.position.z === geometry2.position.z &&
                geometry1.rotation.x === geometry2.rotation.x &&
                geometry1.rotation.y === geometry2.rotation.y &&
                geometry1.rotation.z === geometry2.rotation.z &&
                geometry1.size === geometry2.size
                );
    }

    private isDifferenteFromCollection(newGeometry: GeometryData, collection: GeometryData[]): boolean {
        for (const geometry of collection) {
            if (this.isGeometryEqual(geometry, newGeometry)) {
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
