import { expect } from "chai";
import { Score } from "./score";

describe("Score", () => {
    let score: Score;

    beforeEach(() => {
        score = new Score();
    });

    it("should return a value between min and max", () => {
        const MIN: number = 10;
        const MAX: number = 14;
        const val: number = score.getNumberBetween(MIN, MAX);
        const result: boolean = (val <= MAX) && (val >= MIN);
        expect(result).to.equals(true);
    });

    it("should work even if min is greater than max", () => {
        const MIN: number = 12;
        const MAX: number = 20;
        const val: number = score.getNumberBetween(MAX, MIN);
        const result: boolean = (val <= MAX) && (val >= MIN);
        expect(result).to.equals(true);
    });

    it("should return usernames between 3 and 12 characters", () => {
        const MIN: number = 3;
        const MAX: number = 12;
        const username: string = score.username;
        const result: boolean = (username.length <= MAX) && (username.length >= MIN);
        expect(result).to.equals(true);
    });
});
