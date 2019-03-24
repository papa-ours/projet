import { TopScoresInterface } from "../../../../common/communication/game-description";
import { Score } from "./score";

export class TopScores implements TopScoresInterface {

    public static readonly SCORE_LENGTH: number = 3;

    public scoresStrings: string[];

    public constructor(public scores: Score[]) {
        this.scoresStrings = this.scores.map((score: Score) => new Score(score.time, score.username).toString());
    }

    public static generateTopScores(): TopScores {
        return new TopScores(
            [...Array(TopScores.SCORE_LENGTH)]
                .map(() => Score.createRandom())
                .sort((score1: Score, score2: Score) => score1.time - score2.time),
        );
    }
}
