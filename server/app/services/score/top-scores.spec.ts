import { expect } from "chai";
import { TopScores } from "./top-scores";

// tslint:disable:no-magic-numbers
describe("Top Scores", () => {
    let topScores: TopScores;

    beforeEach(() => {
        topScores = TopScores.generateTopScores();
    });

    it("should be sorted", () => {
        const scoreOneNumber: number = topScores.scores[0].toNumber();
        const scoreTwoNumber: number = topScores.scores[1].toNumber();
        const scoreThreeNumber: number = topScores.scores[2].toNumber();
        const result: boolean = (scoreOneNumber <= scoreTwoNumber && scoreTwoNumber <= scoreThreeNumber);

        expect(result).to.be.equals(true);
    });
});
