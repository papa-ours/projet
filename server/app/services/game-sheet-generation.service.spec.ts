import { expect } from "chai";
import { GameSheet } from "../../../common/communication/game-description";
import { GameSheetGenerationService } from "./game-sheet-generation.service";
import { GetGameService } from "./get-game.service";

describe("game sheet generation", () => {

    let gameSheetGenerator: GameSheetGenerationService;
    const getGameService: GetGameService = new GetGameService();

    beforeEach(() => {
        gameSheetGenerator = new GameSheetGenerationService(getGameService);
    });

    after(() => {
        getGameService.emptyGameSheets();
        getGameService.emptyGames();
    });

    it("should create a gamesheet and put it in the getGameService", () => {
        const name: string = "nom";
        gameSheetGenerator.createGameSheet(name);
        const expected: GameSheet | undefined = getGameService.getGameDescriptions().find((gamesheet: GameSheet) => {
            return gamesheet.name === name;
        });
        expected ? expect(true).to.equals(true) : expect(true).to.equals(false);
    });

    it("should create a topscore with the correct length", () => {
        const name: string = "name";
        const topscoreLength: number = 2;
        gameSheetGenerator.createGameSheet(name);
        const expected: GameSheet | undefined = getGameService.getGameDescriptions().find((gamesheet: GameSheet) => {
            return gamesheet.name === name;
        });
        expected ? expect(expected.topScores.length).to.equals(topscoreLength) : expect(true).to.equals(false);
    });
});
