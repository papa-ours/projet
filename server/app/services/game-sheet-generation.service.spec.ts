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
        gameSheetGenerator.createGameSheet(name, 0, false);
        const expected: GameSheet | undefined = getGameService.getGameDescriptions(0).find((gamesheet: GameSheet) => {
            return gamesheet.name === name;
        });

        expect(expected).to.not.equal(undefined);
    });

    it("should create a topscore with the correct length", () => {
        const name: string = "name";
        const topscoreLength: number = 2;
        const gameSheet: GameSheet = gameSheetGenerator.createGameSheet(name, 0, false);

        expect(gameSheet.topScores.length).to.equals(topscoreLength);
    });
});
