import { ScoreInterface } from "../../../../common/communication/game-description";
import { RandomNumber } from "../utils/random-number";

export class Score implements ScoreInterface {

    public static readonly DEFAULT_SCORE: Score = new Score(Number.POSITIVE_INFINITY, "--");
    public static readonly SECONDS_PER_MINUTES: number = 60;

    public constructor(public time: number, public username: string) {
    }

    public static createRandom(): Score {
        const MIN_TIME: number = 800;
        const MAX_TIME: number = 1200;

        return new Score(RandomNumber.randomInteger(MIN_TIME, MAX_TIME), Score.generateRandomUsername());
    }

    private static generateRandomUsername(): string {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const MIN_LENGTH: number = 3;
        const MAX_LENGTH: number = 12;
        const usernameLength: number = RandomNumber.randomInteger(MIN_LENGTH, MAX_LENGTH);
        const username: string[] = [...Array(usernameLength)].map(() => {
            const index: number = RandomNumber.randomInteger(0, POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        return username.join("");
    }

    public get seconds(): number {
        return this.time % Score.SECONDS_PER_MINUTES;
    }

    public get minutes(): number {
        return Math.floor(this.time / Score.SECONDS_PER_MINUTES);
    }

    public toString(): string {
        if (Number.isFinite(this.time)) {
            return this.username + " " + this.minutes + ":" + this.secondsToString();
        } else {
            return this.username + " " + "--:--";
        }
    }

    public toNumber(): number {
        return this.minutes * Score.SECONDS_PER_MINUTES + this.seconds;
    }

    private secondsToString(): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;

        return ((this.seconds < FIRST_TWO_DIGITS_NUMBER) ? "0" : "") + this.seconds.toString();
    }

}
