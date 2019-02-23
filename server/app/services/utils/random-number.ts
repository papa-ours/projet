export class RandomNumber {

    public static randomInteger(min: number, max: number): number {
        return Math.floor(this.randomFloat(min, max));
    }
    public static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
