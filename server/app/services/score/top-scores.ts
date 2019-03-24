import { TopScoresInterface } from "../../../../common/communication/game-description";
import { Score } from "./score";

export class TopScores implements TopScoresInterface {

    public static readonly SCORE_LENGTH: number = 3;
    public static readonly DEFAULT_TOP_SCORES: TopScores = new TopScores(
        [...Array(TopScores.SCORE_LENGTH)].map(() => Score.DEFAULT_SCORE),
    );

    public constructor(public scores: Score[]) {
    }

    public get scoresStrings(): string[] {
        return this.scores.map((score: Score) => score.toString());
    }
}
