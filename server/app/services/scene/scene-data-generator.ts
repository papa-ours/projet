import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData, GeometryType } from "../../../../common/communication/geometry";
import { SKYBOX_MAX, SKYBOX_MIN } from "../../../../common/communication/skybox";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RandomNumber } from "../utils/random-number";
import { GeometryIntersection } from "./geometry-intersection";

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

        return geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
    }

    public getRandomGeometryData(size?: number, type?: GeometryType): GeometryData {
        const randomPosition: VectorInterface = this.getRandomPosition(size !== undefined);
        const randomRotation: VectorInterface = this.getRandomRotation(size !== undefined);
        const randomColor: number = this.getRandomColor();
        const randomSize: number = size ? this.getRandomSize(size) : this.getRandomSize();

        return {
            position: randomPosition,
            rotation: randomRotation,
            color: randomColor,
            size: randomSize,
            isModified: false,
            type: type ? type : this.getRandomGeometryType(),
        };
    }

    public getRandomNonIntersectingGeometryData(collection: GeometryData[], size?: number, type?: GeometryType): GeometryData {
        let geometry: GeometryData;
        do {
            geometry = this.getRandomGeometryData(size, type);
        } while (GeometryIntersection.intersectsWithCollection(geometry, collection));

        return geometry;
    }

    public getSceneData(numberOfObjects: number, sizes?: number[], type?: GeometryType): GeometryData[] {
        this.validateNumberOfObjects(numberOfObjects);
        const geometryData: GeometryData[] = [];
        for (let i: number = 0; i < numberOfObjects; i++) {
            const size: number | undefined = sizes ? sizes[Math.floor(Math.random() * sizes.length)] : undefined;
            geometryData.push(this.getRandomNonIntersectingGeometryData(geometryData, size, type));
        }

        return geometryData;
    }

}
