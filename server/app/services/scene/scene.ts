import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

export class Scene implements SceneData {
    public constructor(
        public originalScene: GeometryData[],
        public modifiedScene: GeometryData[],
        public name: string,
    ) { }

    public static fromSceneData(other: SceneData): Scene {
        return new Scene(
            other.originalScene,
            other.modifiedScene,
            other.name,
        );
    }

    public static findGeometry(collection: GeometryData[], position: VectorInterface): GeometryData | undefined {
        return collection.find(
            (geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position),
        );
    }

}
