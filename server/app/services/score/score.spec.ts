import { expect } from "chai";
import { Score } from "./score";

describe("Score", () => {
    let score: Score;

    beforeEach(() => {
        score = Score.DEFAULT_SCORE;
    });

    it("should format seconds properly in string", () => {
        const seconds: number = 0;
        score.time = seconds;
        const scoreString: string = score.toString();
        // tslint:disable-next-line:no-magic-numbers
        const result: string = scoreString.slice(scoreString.length - 2);

        expect(result).to.equals("00");
    });
});
