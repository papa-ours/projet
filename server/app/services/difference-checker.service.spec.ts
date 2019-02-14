import { expect } from "chai";
import { DifferenceCheckerService } from "./difference-checker.service";
import { Game } from "./game";

describe("Difference Checker", () => {
    const differenceChecker: DifferenceCheckerService = new DifferenceCheckerService();
    let game: Game;

    beforeEach((done: MochaDone) => {
        const ONE_SECOND: number = 1000;
        game = new Game("0", "voiture");
        setTimeout(
            () => {
                done();
            },
            ONE_SECOND);
    });

    it("should return false if there is no difference at the position", () => {
        const result: boolean = differenceChecker.isPositionDifference(0, 0, game);

        expect(result).to.equals(false);
    });

    it("should return true is the position is a difference", () => {
        const x: number = 35;
        const y: number = 193;
        const result: boolean = differenceChecker.isPositionDifference(x, y, game);

        expect(result).to.equals(true);
    });
});
