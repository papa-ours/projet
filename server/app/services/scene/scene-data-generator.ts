import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, GeometryType } from "../../../../common/communication/geometry";
import { SKYBOX_MAX, SKYBOX_MIN } from "../../../../common/communication/skybox";
import { ThematicObjectType } from "../../../../common/communication/thematic-object";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RandomNumber } from "../utils/random-number";
import { GeometryIntersection } from "./geometry-intersection";
import { Vector } from "./vector";

export interface ThematicObjectData {
    thematicType: ThematicObjectType;
    size: number;
    geometricType: GeometryType;
}

@injectable()
export class SceneDataGeneratorService {
    private readonly BASECOLOR: number = 0xFFFFFF;
    private readonly MIN_OBJECT: number = 10;
    private readonly MAX_OBJECT: number = 200;
    private readonly GEOMETRY_BASE_SIZE: number = 65;

    private checkNumberOfObjects(numberOfObjects: number): boolean {
        return this.MIN_OBJECT <= numberOfObjects && numberOfObjects <= this.MAX_OBJECT;
    }

    private validateNumberOfObjects(numberOfObjects: number): void {
        if (!this.checkNumberOfObjects(numberOfObjects)) {
            throw new RangeError(`Number should be beetwen ${this.MIN_OBJECT} and ${this.MAX_OBJECT}`);
        }
    }

    public getRandomPosition(isYFixed: boolean = false): VectorInterface {
        return {
            x: RandomNumber.randomInteger(SKYBOX_MIN.x, SKYBOX_MAX.x),
            y: isYFixed ? 0 : RandomNumber.randomInteger(SKYBOX_MIN.y, SKYBOX_MAX.y),
            z: RandomNumber.randomInteger(SKYBOX_MIN.z, SKYBOX_MAX.z),
        };
    }

    public getRandomRotation(isYFixed: boolean = false): VectorInterface {
        const maxAngle: number = Math.PI;

        return {
            x: isYFixed ? 0 : RandomNumber.randomFloat(0, maxAngle),
            y: RandomNumber.randomFloat(0, maxAngle),
            z: isYFixed ? 0 : RandomNumber.randomFloat(0, maxAngle),
        };
    }

    public getRandomColor(): number {
        return RandomNumber.randomInteger(0, this.BASECOLOR);
    }

    public getRandomSize(baseSize: number = this.GEOMETRY_BASE_SIZE): number {
        const MIN_FACTOR: number = 0.5;
        const MAX_FACTOR: number = 1.5;

        return RandomNumber.randomInteger(baseSize * MIN_FACTOR, baseSize * MAX_FACTOR);
    }

    public getRandomGeometryType(): GeometryType {
        const geometryTypes: GeometryType[] = [
            GeometryType.SPHERE, GeometryType.CONE,
            GeometryType.CUBE, GeometryType.CYLINDER,
            GeometryType.PYRAMID,
        ];

        return geometryTypes[RandomNumber.randomInteger(0, geometryTypes.length)];
    }

    public getRandomGeometryData(thematicObjectData?: ThematicObjectData): GeometryData {
        const randomPosition: VectorInterface = this.getRandomPosition(thematicObjectData !== undefined);
        const randomRotation: VectorInterface = this.getRandomRotation(thematicObjectData !== undefined);
        const randomColor: number = this.getRandomColor();
        const randomSize: VectorInterface = {
            x: this.getRandomSize(thematicObjectData && thematicObjectData.size),
            y: this.getRandomSize(thematicObjectData && thematicObjectData.size),
            z: this.getRandomSize(thematicObjectData && thematicObjectData.size),
        };

        return {
            position: randomPosition,
            rotation: randomRotation,
            color: randomColor,
            size: randomSize,
            isModified: false,
            type: thematicObjectData ? thematicObjectData.geometricType : this.getRandomGeometryType(),
        };
    }

    public getRandomNonIntersectingGeometryData(collection: GeometryData[], thematicObjectData?: ThematicObjectData): GeometryData {
        let geometry: GeometryData;
        do {
            geometry = this.getRandomGeometryData(thematicObjectData);
        } while (GeometryIntersection.intersectsWithCollection(geometry, collection));

        geometry.thematicObjectType = thematicObjectData ? thematicObjectData.thematicType : undefined;

        return geometry;
    }

    public getSceneData(numberOfObjects: number, sizes?: number[]): GeometryData[] {
        this.validateNumberOfObjects(numberOfObjects);
        const geometryData: GeometryData[] = [];
        for (let i: number = 0; i < numberOfObjects; i++) {
            const thematicObjectData: ThematicObjectData | undefined = sizes ? this.getRandomThematicObjectData(sizes) : undefined;
            geometryData.push(this.getRandomNonIntersectingGeometryData(geometryData, thematicObjectData));
        }

        return geometryData;
    }

    public getRandomThematicObjectType(): ThematicObjectType {
        const thematicObjectTypes: ThematicObjectType[] = [
            ThematicObjectType.APPLE,       ThematicObjectType.CALCULATOR,
            ThematicObjectType.COFFEE_MUG,  ThematicObjectType.BANANA,
            ThematicObjectType.BOOK,        ThematicObjectType.STAPLER,
            ThematicObjectType.SCISSORS,    ThematicObjectType.CAN,
            ThematicObjectType.PENCILS,     ThematicObjectType.CAR,
        ];

        return thematicObjectTypes[RandomNumber.randomInteger(0, thematicObjectTypes.length)];
    }

    public getRandomThematicObjectData(sizes: number[]): ThematicObjectData {
        const thematicObjectType: ThematicObjectType = this.getRandomThematicObjectType();

        return {
            thematicType: thematicObjectType,
            size: sizes[thematicObjectType],
            geometricType: GeometryType.CUBE,
        };
    }

}
