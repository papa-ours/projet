import { injectable } from "inversify";
import "reflect-metadata";
import { REQUIRED_DIFFERENCES_1P } from "../../../../common/communication/constants";
import { GeometryData, GeometryType, Modification, ModificationType } from "../../../../common/communication/geometry";
import { ThematicObjectType } from "../../../../common/communication/thematic-object";
import { DeepCloner } from "../utils/deep-cloner";
import { SceneDataGeneratorService } from "./scene-data-generator";

@injectable()
export class SceneDataDifferenceService {

    private sceneDataGeneratorService: SceneDataGeneratorService;
    private modificationMap: Map<ModificationType, Function>;
    private modifications: Modification[];

    public constructor() {
        this.sceneDataGeneratorService = new SceneDataGeneratorService();
        this.modificationMap = new Map();
        this.modificationMap.set(ModificationType.ADD, this.addGeometryData);
        this.modificationMap.set(ModificationType.DELETE, this.deleteGeometryData);
        this.modificationMap.set(ModificationType.CHANGE_COLOR, this.changeColorGeometryData);
    }

    private addGeometryData = (geometryDataDifference: GeometryData[], index: number,
                               size?: number, type?: GeometryType, thematicObjectType?: ThematicObjectType): void => {
        geometryDataDifference.push(
            this.sceneDataGeneratorService.getRandomNonIntersectingGeometryData(geometryDataDifference, size, type, thematicObjectType),
        );
        console.log(thematicObjectType);

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

    private applyRandomChange(geometryDataDifference: GeometryData[], randomIndex: number,
                              size?: number, type?: GeometryType, thematicObjectType?: ThematicObjectType): void {
        const randomModificationIndex: number = Math.floor(Math.random() * this.modifications.length);
        const randomModificationType: ModificationType = this.modifications[randomModificationIndex].type;
        const randomFunction: Function = this.modificationMap.get(randomModificationType) as Function;

        randomModificationType === ModificationType.ADD ?
            randomFunction(geometryDataDifference, randomIndex, size, type, thematicObjectType) :
            randomFunction(geometryDataDifference, randomIndex);
    }

    public getDifference(geometryData: GeometryData[], modifications: Modification[],
                         sizes?: number[], type?: GeometryType): GeometryData[] {
        const geometryDataDifference: GeometryData[] = DeepCloner.clone(geometryData);
        this.modifications = modifications;
        let differenceCounter: number = 0;
        while (differenceCounter < REQUIRED_DIFFERENCES_1P) {
            const randomIndex: number = Math.floor(Math.random() * geometryDataDifference.length);
            const thematicObjectType: ThematicObjectType | undefined =
                sizes ? this.sceneDataGeneratorService.getRandomThematicObjectType() : undefined;
            const size: number | undefined = thematicObjectType && sizes ? sizes[thematicObjectType] : undefined;

            if (!geometryDataDifference[randomIndex].isModified) {
                this.applyRandomChange(geometryDataDifference, randomIndex, size, type, thematicObjectType);
                differenceCounter++;
            }
        }

        return geometryDataDifference;
    }

}
