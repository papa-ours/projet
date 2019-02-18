import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, Modification, ModificationType } from "../../../../common/communication/geometryMessage";
import { SceneDataGeneratorService } from "./scene-data-generator";
import { DeepCloner } from "../utils/deep-cloner";

@injectable()
export class SceneDataDifferenceService {
    private sceneDataGeneratorService: SceneDataGeneratorService;
    private readonly MAX_DIFFERENCE: number = 7;
    private modificationMap: Map<ModificationType, Function>;
    private modifications: Modification[];

    public constructor() {
        this.sceneDataGeneratorService = new SceneDataGeneratorService();
        this.modificationMap = new Map();
        this.modificationMap.set(ModificationType.ADD, this.addGeometryData);
        this.modificationMap.set(ModificationType.DELETE, this.deleteGeometryData);
        this.modificationMap.set(ModificationType.CHANGE_COLOR, this.changeColorGeometryData);
    }

    private addGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        geometryDataDifference.push(this.sceneDataGeneratorService.getRandomGeometryData());
        geometryDataDifference[geometryDataDifference.length - 1].isModified = true;
    }

    private deleteGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        const numberOfDeletion: number = 1;
        geometryDataDifference.splice(index, numberOfDeletion);
    }

    private changeColorGeometryData = (geometryDataDifference: GeometryData[], index: number): void => {
        const newColor: number = this.sceneDataGeneratorService.getRandomColor();
        geometryDataDifference[index].color = newColor;
        geometryDataDifference[index].isModified = true;
    }

    private applyRandomChange(geometryDataDifference: GeometryData[], randomIndex: number): void {
        const randomModificationIndex: number = Math.floor(Math.random() * this.modifications.length);
        const randomModificationType: ModificationType = this.modifications[randomModificationIndex].type;
        const randomFunction: Function = this.modificationMap.get(randomModificationType) as Function;

        randomFunction(geometryDataDifference, randomIndex);
    }

    public getDifference(geometryData: GeometryData[], modifications: Modification[]): GeometryData[] {
        const geometryDataDifference: GeometryData[] = DeepCloner.clone(geometryData);
        this.modifications = modifications;
        let differenceCounter: number = 0;
        while (differenceCounter < this.MAX_DIFFERENCE) {
            const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
            if (!geometryDataDifference[randomIndex].isModified) {
                this.applyRandomChange(geometryDataDifference, randomIndex);
                differenceCounter++;
            }
        }

        return geometryDataDifference;
    }

}
