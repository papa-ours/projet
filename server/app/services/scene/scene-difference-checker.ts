import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
@injectable()
export class SceneDifferenceCheckerService {

    public constructor() {

    }

    public checkDifference(scene: SceneData, position: VectorInterface): boolean {
        const originalScene: Set<GeometryData> = new Set<GeometryData>(scene.originalScene);
        const modifiedScene: Set<GeometryData> = new Set<GeometryData>(scene.modifiedScene);
        console.log("original", originalScene.size);
        console.log("modified", modifiedScene.size);
        return true;
    }

}
