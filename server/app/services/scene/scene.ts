import { GeometryData, SceneData } from "../../../../common/communication/geometry";

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

}