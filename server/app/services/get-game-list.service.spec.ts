import { expect } from "chai";
import { GameLists } from "../../../common/communication/game-description";
import { GetGameListService } from "./get-game-list.service";

describe("get game list", () => {
    it("should return the game list properly", async () => {
        const getGameListService: GetGameListService = new GetGameListService();
        const result: GameLists = await getGameListService.getGameList();
        expect(result).to.not.equals(undefined);
    });
});
