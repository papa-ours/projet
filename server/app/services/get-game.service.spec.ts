import { expect } from "chai";
import { GameSheet, GameType, TopScoresInterface } from "../../../common/communication/game-description";
import { AbstractGame } from "./game/game";
import { GetGameService } from "./get-game.service";

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

        expect(() => {
            return getGameService.getGame(id);
        }).to.throws("Aucune Game n'a le id 1");
    });

    it("should return undefined if there's no corresponding gamesheet with id", () => {
        const id: string = "1";

        expect(() => {
            getGameService.getGameSheet(id, 0);
        }).to.throws("Aucune GameSheet n'a le id 1");
    });

    it("should return the GameSheetDescription properly if it's empty", () => {
        const expected: GameSheet[] = [];
        const result: GameSheet[] = getGameService.getGameDescriptions(0);
        expect(result).to.deep.equal(expected);
    });

    it("should add the game in the GameService properly", () => {
        getGameService.addGameSheet(gameSheet, 0);
        expect(getGameService.getGameSheet(gameSheet.id, 0)).to.equal(gameSheet);
    });

    it("should return the GameSheetDescription properly", () => {
        const expected: GameSheet[] = [gameSheet];
        const result: GameSheet[] = getGameService.getGameDescriptions(0);
        expect(result).to.deep.equal(expected);
    });

    it("should create an id with the correct length", () => {
        const ID_LENGTH: number = 25;

        expect(gameSheet.id.length).to.equals(ID_LENGTH);
    });

    it("should create a game properly", async () => {
        const id: string = await getGameService.createGame("voiture", GameType.Simple);
        const game: AbstractGame = getGameService.getGame(id);

        expect(game.id).to.equals(id);
    });
});
