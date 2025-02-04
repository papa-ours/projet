import { GeometryData, SceneData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

export class Scene implements SceneData {
    public constructor(
        public originalScene: GeometryData[],
        public modifiedScene: GeometryData[],
        public name: string,
        public type: SceneType,
    ) { }

    public static fromSceneData(other: SceneData): Scene {
        return new Scene(
            other.originalScene,
            other.modifiedScene,
            other.name,
            other.type,
        );
    }

    public static findGeometry(collection: GeometryData[], position: VectorInterface): GeometryData | undefined {
        return collection.find(
            (geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position),
        );
    }

    public isColorChangeAtPosition(position: VectorInterface): boolean {
        const original: GeometryData | undefined = Scene.findGeometry(this.originalScene, position);
        const modified: GeometryData | undefined = Scene.findGeometry(this.modifiedScene, position);

        return (
            original !== undefined &&
            modified !== undefined &&
            original.color !== modified.color
        );
    }

}
