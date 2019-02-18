import { expect } from "chai";
import { GameSheet, TopScoresInterface } from "../../../common/communication/game-description";
import { Game } from "./game";
import { GetGameService } from "./get-game.service";

// tslint:disable-next-line:max-func-body-length
describe("GetGameService", () => {

    let getGameService: GetGameService;
    const topScoreInterface: TopScoresInterface[] = [];
    const gameSheet: GameSheet = {id: "", name: "car", topScores: topScoreInterface};

    beforeEach(() => {
        getGameService = new GetGameService();
    });

    after(() => {
        getGameService.emptyGameSheets();
        getGameService.emptyGames();
    });

    it("should return throw an error if there's no corresponding id", () => {
        const id: string = "1";
        try {
            getGameService.getGame(id);
            expect(true).to.equals(false);
        } catch {
            expect(true).to.equals(true);
        }
    });

    it("should return the GameSheetDescription properly if it's empty", () => {
        const expected: GameSheet[] = [];
        const result: GameSheet[] = getGameService.getGameDescriptions();
        expect(result).to.deep.equal(expected);
    });

    it("should add the game in the GameService properly", () => {
        getGameService.addGameSheet(gameSheet);
        expect(getGameService.getGameSheet(gameSheet.id)).to.equal(gameSheet);
    });

    it("should return the GameSheetDescription properly", () => {
        const expected: GameSheet[] = [gameSheet];
        const result: GameSheet[] = getGameService.getGameDescriptions();
        expect(result).to.deep.equal(expected);
    });

    it("should create an id with the correct length", () => {
        const ID_LENGTH: number = 25;
        expect(gameSheet.id.length).to.equals(ID_LENGTH);
    });

    it("should create a game properly", () => {
        const id: string = getGameService.createGame("voiture");
        const game: Game | undefined = getGameService.getGame(id);

        game ? expect(game.id).to.equals(id) : expect(false).to.equals(true);
    });
});
