import { expect } from "chai";
import { GameType } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { DifferenceCheckerService } from "./difference-checker.service";
import { Game } from "./game";

describe("Difference Checker", () => {
    const differenceChecker: DifferenceCheckerService = container.get<DifferenceCheckerService>(Types.DifferenceCheckerService);
    let game: Game;

    before((done: Mocha.Done) => {
        const FIVE_SECONDS: number = 5000;
        game = new Game("0", "voiture", GameType.Simple);
        setTimeout(done, FIVE_SECONDS);
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
