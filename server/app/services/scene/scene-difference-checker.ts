import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";
import { Scene } from "./scene";

@injectable()
export class SceneDifferenceCheckerService {

    public differences: GeometryData[];
    public scene: Scene;

    public constructor(sceneData: SceneData) {
        this.scene = Scene.fromSceneData(sceneData);
        this.differences = this.getDifferences(sceneData.originalScene, sceneData.modifiedScene);
    }

    private isPositionInCollection(newGeometry: GeometryData, collection: GeometryData[]): boolean {
        return collection.some(
            (geometry: GeometryData) => (Geometry.fromGeometryData(geometry).isPositionEqual(newGeometry.position)),
        );
    }

    private getDifferences(original: GeometryData[], modified: GeometryData[]): GeometryData[] {
        const suppression: GeometryData[] = original.filter((geometry: GeometryData) => !this.isPositionInCollection(geometry, modified));
        const adding: GeometryData[] = modified.filter((geometry: GeometryData) => !this.isPositionInCollection(geometry, original));
        const color: GeometryData[] = original.filter((geometry: GeometryData) => this.scene.isColorChangeAtPosition(geometry.position));

        return [...suppression, ...adding, ...color];
    }

    public checkDifference(position: VectorInterface): boolean {

        return this.differences.some((geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position));
    }
}
