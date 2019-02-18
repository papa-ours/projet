export class RandomNumber {

    public randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
    public randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
