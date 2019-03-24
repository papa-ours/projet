import { TopScoresInterface } from "../../../../common/communication/game-description";
import { Score } from "./score";

export class TopScores implements TopScoresInterface {

    public static readonly SCORE_LENGTH: number = 3;

    public scores: Score[];
    public scoresStrings: string[];

    public constructor() {
        this.createScores();
    }

    private createScoreStrings(): void {
        this.scoresStrings = this.scores.map((score: Score) => {
            return score.toString();
        });
    }
}
