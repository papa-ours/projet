import { expect } from "chai";
import { GameLists } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { GetGameListService } from "./get-game-list.service";

describe("get game list", () => {
    const getGameListService: GetGameListService = container.get<GetGameListService>(Types.GetGameListService);
    it("should return the game list properly", async () => {
        const result: GameLists = await getGameListService.getGameList();
        expect(result).to.not.equals(undefined);
    });
});
