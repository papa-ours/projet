export class RandomNumber {

    public constructor() {}
    public randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    public randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    public randomColor(): number {
        const BASE_COLOR: number = 0xFFFFFF;

        return Math.floor(Math.random() * BASE_COLOR);
    }
    public randomScale(numberToScale: number): number {
        const MIN_FACTOR: number = 0.5;
        const MAX_FACTOR: number = 1.5;

        return this.randomInteger(numberToScale * MIN_FACTOR, numberToScale * MAX_FACTOR);
    }
}
