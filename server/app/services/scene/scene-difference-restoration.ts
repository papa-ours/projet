import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

@injectable()
export class SceneDifferenceRestorationService {

    public constructor( private scene: SceneData) {}

    private findGeometry(collection: GeometryData [] , position: VectorInterface): GeometryData | undefined {

        return collection.find (
                    (geometry: GeometryData) =>
                    Geometry.fromGeometryData(geometry).isPositionEqual(position),
            );
    }

    private findIndex(collection: GeometryData [] , position: VectorInterface): number {
        return collection.findIndex(
             (geometry: GeometryData) =>
              Geometry.fromGeometryData(geometry).isPositionEqual(position),
             );
    }

    public getSceneAfterDifferenceUpdate(position: VectorInterface): SceneData {
        let modification: GeometryData ;
        let index: number;
        switch (true) {
            // chagement de couleur
            case this.findGeometry(this.scene.originalScene, position) !== undefined &&
                 this.findGeometry(this.scene.modifiedScene, position) !== undefined :

                 modification = this.findGeometry(this.scene.originalScene, position) as GeometryData;
                 index = this.findIndex(this.scene.modifiedScene, position);
                 this.scene.modifiedScene[index].color = modification.color;
                 break;
            // cas d'un ajout
            case this.findGeometry(this.scene.originalScene, position) === undefined :

                index = this.findIndex(this.scene.modifiedScene, position);
                this.scene.modifiedScene.splice(index , 1);
                break;
            // delete
            case this.findGeometry(this.scene.modifiedScene, position) === undefined :

                modification = this.findGeometry(this.scene.originalScene, position) as GeometryData;
                this.scene.modifiedScene.push(modification);
                break;
            default:
        }

        return this.scene;

    }

}
