import { expect } from "chai";
import { Score } from "./score";

describe("Score", () => {
    let score: Score;

    beforeEach(() => {
        score = new Score();
    });

    it("should return usernames between 3 and 12 characters", () => {
        const MIN: number = 3;
        const MAX: number = 12;
        const username: string = score.username;
        const result: boolean = (username.length <= MAX) && (username.length >= MIN);

        expect(result).to.equals(true);
    });

    it("should format seconds properly in string", () => {
        const seconds: number = 0;
        score.seconds = seconds;
        const scoreString: string = score.toString();
        // tslint:disable-next-line:no-magic-numbers
        const result: string = scoreString.slice(scoreString.length - 2);

        expect(result).to.equals("00");
    });
});
