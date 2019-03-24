import { TopScoresInterface } from "../../../../common/communication/game-description";
import { Score } from "./score";

export class TopScores implements TopScoresInterface {

    public static readonly SCORE_LENGTH: number = 3;
    public static readonly DEFAULT_TOP_SCORES: TopScores = new TopScores(
        [...Array(TopScores.SCORE_LENGTH)].map(() => Score.DEFAULT_SCORE),
    );

    public scoresStrings: string[];

    public constructor(public scores: Score[]) {
        this.scoresStrings = this.scores.map((score: Score) => new Score(score.time, score.username).toString());
    }

}
