import { ScoreInterface } from "../../../../common/communication/game-description";

export class Score implements ScoreInterface {

    public static readonly SECONDS_PER_MINUTES: number = 60;

    public constructor(public time: number, public username: string) {
    }

    public get seconds(): number {
        return this.time % Score.SECONDS_PER_MINUTES;
    }

    public get minutes(): number {
        return Math.floor(this.time / Score.SECONDS_PER_MINUTES);
    }

    public toString(): string {
        return this.username + " " + this.minutes + ":" + this.secondsToString();
    }

    public toNumber(): number {
        return this.minutes * Score.SECONDS_PER_MINUTES + this.seconds;
    }

    private secondsToString(): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;

        return ((this.seconds < FIRST_TWO_DIGITS_NUMBER) ? "0" : "") + this.seconds.toString();
    }

    private makeMinutes(): void {
        const MIN: number = 8;
        const MAX: number = 15;

        this.minutes = RandomNumber.randomInteger(MIN, MAX);
    }

    private makeSeconds(): void {
        const MIN: number = 0;
        const MAX: number = 59;

        this.seconds = RandomNumber.randomInteger(MIN, MAX);
    }

    public makeUsername(): void {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const MIN_LENGTH: number = 3;
        const MAX_LENGTH: number = 12;
        const usernameLength: number = RandomNumber.randomInteger(MIN_LENGTH, MAX_LENGTH);
        const username: string[] = [...Array(usernameLength)].map(() => {
            const index: number = RandomNumber.randomInteger(0, POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        this.username = username.join("");
    }
}
