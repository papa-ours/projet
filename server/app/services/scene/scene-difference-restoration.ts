import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Geometry } from "./geometry";

@injectable()
export class SceneDifferenceRestorationService {

    public constructor(private scene: SceneData) { }

    private findGeometry(collection: GeometryData[], position: VectorInterface): GeometryData | undefined {

        return collection.find(
            (geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position),
        );
    }

    private findIndex(collection: GeometryData[], position: VectorInterface): number {
        return collection.findIndex(
            (geometry: GeometryData) => Geometry.fromGeometryData(geometry).isPositionEqual(position),
        );
    }

    private isColorChange(position: VectorInterface): boolean {
        return (this.findGeometry(this.scene.originalScene, position) !== undefined &&
            this.findGeometry(this.scene.modifiedScene, position) !== undefined
        );
    }

    private restorColor(position: VectorInterface): void {
        const modification: GeometryData = this.findGeometry(this.scene.originalScene, position) as GeometryData;
        const index: number = this.findIndex(this.scene.modifiedScene, position);
        this.scene.modifiedScene[index].color = modification.color;

    }

    private isAddition(position: VectorInterface): boolean {
        return this.findGeometry(this.scene.originalScene, position) === undefined;
    }

    private restorAddition(position: VectorInterface): void {
        const index: number = this.findIndex(this.scene.modifiedScene, position);
        this.scene.modifiedScene.splice(index, 1);
    }

    private isDeletion(position: VectorInterface): boolean {
        return this.findGeometry(this.scene.modifiedScene, position) === undefined;
    }

    private restoreDeletion(position: VectorInterface): void {
        const modification: GeometryData = this.findGeometry(this.scene.originalScene, position) as GeometryData;
        this.scene.modifiedScene.push(modification);
    }

    public getSceneAfterDifferenceUpdate(position: VectorInterface): SceneData {
        switch (true) {
            case this.isColorChange(position):
                this.restorColor(position);
                break;

            case this.isAddition(position):
                this.restorAddition(position);
                break;

            case this.isDeletion(position):
                this.restoreDeletion(position);
                break;
            default:
        }

        return this.scene;

    }

}
