import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";
import { Scene } from "./scene";

@injectable()
export class SceneDifferenceCheckerService {

    private isGeometryInCollection(newGeometry: GeometryData, collection: GeometryData[]): boolean {
        return collection.some(
            (geometry: GeometryData) => (Geometry.fromGeometryData(geometry).isPositionEqual(newGeometry.position)),
        );
    }

    public getDifferences(sceneData: SceneData): GeometryData[] {
        const scene: Scene = Scene.fromSceneData(sceneData);
        const suppression: GeometryData[] = scene.originalScene.filter(
            (geometry: GeometryData) => !this.isGeometryInCollection(geometry, scene.modifiedScene),
        );
        const adding: GeometryData[] = scene.modifiedScene.filter(
            (geometry: GeometryData) => !this.isGeometryInCollection(geometry, scene.originalScene),
        );
        const color: GeometryData[] = scene.originalScene.filter(
            (geometry: GeometryData) => scene.isColorChangeAtPosition(geometry.position),
        );

        return [...suppression, ...adding, ...color];
    }

    public checkDifference(sceneData: SceneData, position: VectorInterface): boolean {
        const differences: GeometryData[] = this.getDifferences(sceneData);

        return differences.some((geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position));
    }
}
