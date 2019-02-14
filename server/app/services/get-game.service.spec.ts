import { expect } from "chai";
import { GameSheet, TopScoresInterface } from "../../../common/communication/game-description";
import { GetGameService } from "./get-game.service";

describe("GetGameService", () => {

    let getGameService: GetGameService;
    const carID: string = "0";
    const topScoreInterface: TopScoresInterface[] = [];
    const gameSheet: GameSheet = {id: carID, name: "car", topScores: topScoreInterface};

    beforeEach(() => {
        getGameService = new GetGameService();
    });

    it("should return undefined if there's no corresponding id", () => {
        const id: string = "1";
        expect(getGameService.getGame(id)).to.equal(undefined);
    });

    it("should return the GameSheetDescription properly if it's empty", () => {
        const expected: GameSheet[] = [];
        const result: GameSheet[] = getGameService.getGameDescriptions();
        expect(result).to.deep.equal(expected);
    });

    it("should add the game in the GameService properly", () => {
        getGameService.addGameSheet(gameSheet);
        expect(getGameService.getGameSheet(carID)).to.equal(gameSheet);
    });

    it("should return the GameSheetDescription properly", () => {
        const expected: GameSheet[] = [gameSheet];
        const result: GameSheet[] = getGameService.getGameDescriptions();
        expect(result).to.deep.equal(expected);
    });
});
