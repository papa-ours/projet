import { expect } from "chai";
import { TopScores } from "./top-scores";

describe("Top Scores", () => {
    let topScores: TopScores;

    beforeEach(() => {
        topScores = new TopScores();
    });

    it("should be sorted", () => {
        const scoreOneNumber: number = topScores.scores[0].toNumber();
        const scoreTwoNumber: number = topScores.scores[1].toNumber();

        expect(scoreOneNumber).to.be.lessThan(scoreTwoNumber);
    });

    it("should be sorted", () => {
        const scoreTwoNumber: number = topScores.scores[1].toNumber();
        const scoreThreeNumber: number = topScores.scores[2].toNumber();

        expect(scoreTwoNumber).to.be.lessThan(scoreThreeNumber);
    });
});
