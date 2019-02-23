import { expect } from "chai";
import { GameLists } from "../../../common/communication/game-description";
import { GetGameListService } from "./get-game-list.service";
import { GetGameService } from "./get-game.service";

describe("get game list", () => {

    it("should actually test something", () => {
        expect(true).to.equals(true);
    });

    it("should return the game list properly", async () => {
        const expected: GameLists = { list2d: [], list3d: [] };

        const getGameListService: GetGameListService = new GetGameListService(
            new GetGameService(),
        );
        const result: GameLists = getGameListService.getGameList();
        expect(expected).to.deep.equals(result);
    });
});
