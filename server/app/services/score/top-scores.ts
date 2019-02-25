import { TopScoresInterface } from "../../../../common/communication/game-description";
import { Score } from "./score";

export class TopScores implements TopScoresInterface {
    public scores: Score[];
    public scoresStrings: string[];
    private readonly SCORE_LENGTH: number = 3;

    public constructor() {
        this.createScores();
        this.sortScores();
        this.createScoreStrings();
    }

    private createScores(): void {
        this.scores = [...Array(this.SCORE_LENGTH)].map(() => {
            return new Score();
        });
    }

    private createScoreStrings(): void {
        this.scoresStrings = this.scores.map((score: Score) => {
            return score.toString();
        });
    }

    private sortScores(): void {
        this.scores.sort((firstScore: Score, secondScore: Score): number => {
            return firstScore.toNumber() - secondScore.toNumber();
        });
    }
}
