import { inject, injectable } from "inversify";
import "reflect-metadata";
import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { GeometryData, Modification, ModificationType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import Types from "../../types";
import { DeepCloner } from "../utils/deep-cloner";
import { SceneDataGeneratorService, ThematicObjectData } from "./scene-data-generator";

@injectable()
export class SceneDataDifferenceService {

    private modificationMap: Map<ModificationType, Function>;
    private modifications: Modification[];

    public constructor(@inject(Types.SceneDataGeneratorService) private sceneDataGeneratorService: SceneDataGeneratorService) {
        this.modificationMap = new Map();
        this.modificationMap.set(ModificationType.ADD, this.addGeometryData);
        this.modificationMap.set(ModificationType.DELETE, this.deleteGeometryData);
        this.modificationMap.set(ModificationType.CHANGE_COLOR, this.changeColorGeometryData);
    }

    private addGeometryData = (geometryDataDifference: GeometryData[], index: number, thematicObjectData?: ThematicObjectData): void => {
        geometryDataDifference.push(
            this.sceneDataGeneratorService.getRandomNonIntersectingGeometryData(geometryDataDifference, thematicObjectData),
        );

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

    private applyRandomChange(geometryDataDifference: GeometryData[], randomIndex: number, thematicObjectData?: ThematicObjectData): void {
        const randomModificationIndex: number = Math.floor(Math.random() * this.modifications.length);
        const randomModificationType: ModificationType = this.modifications[randomModificationIndex].type;
        const randomFunction: Function = this.modificationMap.get(randomModificationType) as Function;

        randomModificationType === ModificationType.ADD ?
            randomFunction(geometryDataDifference, randomIndex, thematicObjectData) :
            randomFunction(geometryDataDifference, randomIndex);
    }

    public getDifference(geometryData: GeometryData[], modifications: Modification[], sizes?: VectorInterface[]): GeometryData[] {
        const geometryDataDifference: GeometryData[] = DeepCloner.clone(geometryData);
        this.modifications = modifications;
        let differenceCounter: number = 0;
        while (differenceCounter < REQUIRED_DIFFERENCES_1P) {
            const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
            if (!geometryDataDifference[randomIndex].isModified) {
                const thematicObjectData: ThematicObjectData | undefined = sizes ?
                    this.sceneDataGeneratorService.getRandomThematicObjectData(sizes) : undefined;
                this.applyRandomChange(geometryDataDifference, randomIndex, thematicObjectData);
                differenceCounter++;
            }
        }

        return geometryDataDifference;
    }

}
