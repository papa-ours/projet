import { expect } from "chai";
import { DifferenceCheckerService } from "./difference-checker.service";
import { SimpleGame } from "./game/simple-game";

describe("Difference Checker", () => {
    const differenceChecker: DifferenceCheckerService = new DifferenceCheckerService();
    let game: SimpleGame;

    before((done: Mocha.Done) => {
        SimpleGame.create("0", "voiture").then((createdGame: SimpleGame) => {
            game = createdGame;
            done();
        }).catch((err: Error) => console.error(err.message));
    });

    it("should return false if there is no difference at the position", () => {
        const result: boolean = differenceChecker.isPositionDifference(0, 0, game);

        expect(result).to.equals(false);
    });

    it("should return true if the position is a difference", () => {
        const x: number = 35;
        const y: number = 193;
        const result: boolean = differenceChecker.isPositionDifference(x, y, game);

        expect(result).to.equals(true);
    });

    it("should return false if the position is out of the image", () => {
        const x: number = -1;
        const y: number = -1;
        const result: boolean = differenceChecker.isPositionDifference(x, y, game);

        expect(result).to.equals(false);
    });
});
