export class RandomNumber {

    public randomInteger(min: number, max: number): number {
        return Math.floor(this.randomFloat(min, max));
    }
    public randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
