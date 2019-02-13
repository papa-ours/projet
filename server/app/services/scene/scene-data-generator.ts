import { injectable } from "inversify";
import "reflect-metadata";
import { GeometryData } from "../../../../common/communication/geometryMessage";
import { Vector } from "../../../../common/communication/position";
import { SKYBOX_MAX, SKYBOX_MIN } from "../../../../common/communication/skybox";
import { RandomNumber } from "../utils/random-number";
@injectable()
export class SceneDataGeneratorService {
    private readonly baseColor: number = 0xFFFFFF;
    private readonly geometryBaseSize: number = 65;
    private readonly randomNumber: RandomNumber =  new RandomNumber();
    public constructor () {}
    public getRandomPosition(): Vector {

        return {x:  this.randomNumber.randomInteger(SKYBOX_MIN.x, SKYBOX_MAX.x),
                y: this.randomNumber.randomInteger(SKYBOX_MIN.y , SKYBOX_MAX.y),
                z: this.randomNumber.randomInteger(SKYBOX_MIN.z , SKYBOX_MAX.z)};
    }

    public getRandomRotation(): Vector {
        const maxAngle: number = Math.PI;

        return {x:  this.randomNumber.randomFloat(0, maxAngle),
                y: this.randomNumber.randomFloat(0, maxAngle),
                z: this.randomNumber.randomFloat(0, maxAngle) };
    }

    public getRandomColor(): number {
        return  Math.floor(Math.random() * this.baseColor);
    }
    public getRandomSize(): number {
        const MIN_FACTOR: number = 0.5;
        const MAX_FACTOR: number = 1.5;

        return this.randomNumber.randomInteger(this.geometryBaseSize * MIN_FACTOR, this.geometryBaseSize * MAX_FACTOR);
    }
    public getSceneData(numberOfObjects: number): GeometryData [] {
        const geometryMessage: GeometryData [] = [];
        for (let i: number = 0; i < numberOfObjects; i++) {
            const randomPosition: Vector = this.getRandomPosition();
            const randomRotation: Vector = this.getRandomRotation();
            const randomColor: number = this.getRandomColor();
            const randomSize: number = this.getRandomSize();
            geometryMessage.push({ position: randomPosition, rotation: randomRotation,
                                   color: randomColor, size: randomSize, isModified: false});
        }

        return geometryMessage;
    }
}
