import { expect } from "chai";
import { GameSheet } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { GameSheetGenerationService } from "./game-sheet-generation.service";
import { GetGameService } from "./get-game.service";

describe("game sheet generation", () => {
    let gameSheetGenerator: GameSheetGenerationService;
    const getGameService: GetGameService = container.get<GetGameService>(Types.GetGameService);

    beforeEach(() => {
        gameSheetGenerator = container.get<GameSheetGenerationService>(Types.GameSheetGenerationService);
    });

    after(() => {
        getGameService.emptyGames();
    });

    it("should create a topscore with the correct length", () => {
        const name: string = "name";
        const topscoreLength: number = 2;
        const gameSheet: GameSheet = gameSheetGenerator.createGameSheet(name, 0, false);

        expect(gameSheet.topScores.length).to.equals(topscoreLength);
    });
});
