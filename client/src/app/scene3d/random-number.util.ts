export class RandomNumber {

    public constructor() {}
    public randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    public randomColor(): number {
        const BASE_COLOR: number = 0xFFFFFF;

        return Math.floor(Math.random() * BASE_COLOR);
    }
}