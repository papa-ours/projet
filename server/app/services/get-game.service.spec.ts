import { expect } from "chai";
import { GameType } from "../../../common/communication/game-description";
import { AbstractGame } from "./game/game";
import { GetGameService } from "./get-game.service";

describe("GetGameService", () => {
    let getGameService: GetGameService;

    beforeEach(() => {
        getGameService = new GetGameService();
    });

    after(() => {
        getGameService.emptyGames();
    });

    it("should return throw an error if there's no corresponding id", () => {
        const id: string = "1";

        expect(() => {
            return getGameService.getGame(id);
        }).to.throws("Aucune Game n'a le id 1");
    });

    it("should create an id with the correct length", () => {
        const ID_LENGTH: number = 25;
        getGameService.createGame("voiture", GameType.Simple).then((id: string) => {
            const game: AbstractGame = getGameService.getGame(id);
            expect(game.id.length).to.equals(ID_LENGTH);
        });
    });

    it("should create a game properly", async () => {
        const id: string = await getGameService.createGame("voiture", GameType.Simple);
        const game: AbstractGame = getGameService.getGame(id);

        expect(game.id).to.equals(id);
    });
});
