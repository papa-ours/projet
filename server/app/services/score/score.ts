import { ScoreInterface } from "../../../../common/communication/game-description";

export class Score implements ScoreInterface {

    public static readonly DEFAULT_SCORE: Score = new Score(Number.POSITIVE_INFINITY, "--");

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
