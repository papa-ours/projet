import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, GeometryType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/position";
import { SKYBOX_MAX, SKYBOX_MIN } from "../../../../common/communication/skybox";
import { RandomNumber } from "../utils/random-number";
import { GeometryIntersection } from "./geometry-intersection";

@injectable()
export class SceneDataGeneratorService {
    private readonly baseColor: number = 0xFFFFFF;
    private readonly minObject: number = 10;
    private readonly maxObject: number = 200;
    private readonly geometryBaseSize: number = 65;
    private readonly randomNumber: RandomNumber;

    public constructor() {
        this.randomNumber = new RandomNumber();
    }

    private checkNumberOfObjects(numberOfObjects: number): boolean {
        return this.minObject <= numberOfObjects && numberOfObjects <= this.maxObject;
    }

    private validateNumberOfObjects(numberOfObjects: number): void {
        if (!this.checkNumberOfObjects(numberOfObjects)) {
            throw new Error(`Number should be beetwen ${this.minObject} and ${this.maxObject}`);
        }
    }

    public getRandomPosition(): VectorInterface {
        return {
            x: this.randomNumber.randomInteger(SKYBOX_MIN.x, SKYBOX_MAX.x),
            y: this.randomNumber.randomInteger(SKYBOX_MIN.y , SKYBOX_MAX.y),
            z: this.randomNumber.randomInteger(SKYBOX_MIN.z , SKYBOX_MAX.z),
        };
    }

    public getRandomRotation(): VectorInterface {
        const maxAngle: number = Math.PI;

        return {
            x: this.randomNumber.randomFloat(0, maxAngle),
            y: this.randomNumber.randomFloat(0, maxAngle),
            z: this.randomNumber.randomFloat(0, maxAngle),
        };
    }

    public getRandomColor(): number {
        return this.randomNumber.randomInteger(0, this.baseColor);
    }

    public getRandomSize(): number {
        const MIN_FACTOR: number = 0.5;
        const MAX_FACTOR: number = 1.5;

        return this.randomNumber.randomInteger(this.geometryBaseSize * MIN_FACTOR, this.geometryBaseSize * MAX_FACTOR);
    }

    public getRandomGeometrieType(): GeometryType {
        const geometrieTypes: GeometryType[] = [
            GeometryType.SPHERE, GeometryType.CONE,
            GeometryType.CUBE, GeometryType.CYLINDER,
            GeometryType.PYRAMID,
        ];

        return geometrieTypes[Math.floor(Math.random() * geometrieTypes.length)];
    }

    public getRandomGeometryData(): GeometryData {
        const randomPosition: VectorInterface = this.getRandomPosition();
        const randomRotation: VectorInterface = this.getRandomRotation();
        const randomColor: number = this.getRandomColor();
        const randomSize: number = this.getRandomSize();

        return {
            position: randomPosition,
            rotation: randomRotation,
            color: randomColor,
            size: randomSize,
            isModified: false,
            type: this.getRandomGeometrieType(),
        };
    }

    public getRandomNonIntersectingGeometryData(collection: GeometryData[]): GeometryData {
        let geometry: GeometryData;
        do {
            geometry = this.getRandomGeometryData();
        } while (!GeometryIntersection.intersectsWithCollection(geometry, collection));

        return geometry;
    }

    public getSceneData(numberOfObjects: number): GeometryData[] {
        this.validateNumberOfObjects(numberOfObjects);
        const geometryData: GeometryData[] = [];
        for (let i: number = 0; i < numberOfObjects; i++) {
            geometryData.push(this.getRandomNonIntersectingGeometryData(geometryData));
        }

        return geometryData;
    }

}
