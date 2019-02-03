import { ScoreInterface } from "../../../../common/communication/game-description";

export class Score implements ScoreInterface {
    public minutes: number;
    public seconds: number;
    public username: string;

    public constructor() {
        this.makeMinutes();
        this.makeSeconds();
        this.makeUsername();
    }

    public toString(): string {
        return this.username + " " + this.minutes + ":" + this.secondsToString();
    }

    public toNumber(): number {
        const SECONDS_PER_MINUTES: number = 60;

        return this.minutes * SECONDS_PER_MINUTES + this.seconds;
    }

    private secondsToString(): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;

        return ((this.seconds < FIRST_TWO_DIGITS_NUMBER) ? "0" : "") + this.seconds.toString();
    }

    private makeMinutes(): void {
        const MIN: number = 8;
        const MAX: number = 15;

        this.minutes = this.getNumberBetween(MIN, MAX);
    }

    private makeSeconds(): void {
        const MIN: number = 0;
        const MAX: number = 59;

        this.seconds = this.getNumberBetween(MIN, MAX);
    }

    public makeUsername(): void {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const MIN_LENGTH: number = 3;
        const MAX_LENGTH: number = 12;
        const usernameLength: number = this.getNumberBetween(MIN_LENGTH, MAX_LENGTH);
        const username: string[] = [...Array(usernameLength)].map(() => {
            const index: number = this.getNumberBetween(0, POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        this.username = username.join("");
    }

    public getNumberBetween(min: number, max: number): number {
        if (min > max) {
            // If min is greater than max, we switch them
            const temp: number = max;
            max = min;
            min = temp;
        }

        return Math.floor(Math.random() * (max - min)) + min;
    }
}
