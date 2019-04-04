import { expect } from "chai";
import { container } from "../inversify.config";
import Types from "../types";
import { GetGameListService } from "./get-game-list.service";

describe("get game list", () => {
    const getGameListService: GetGameListService = container.get<GetGameListService>(Types.GetGameListService);
    it("should return the game list properly", async () => {
        expect(await getGameListService.getGameList()).to.not.equals(undefined);
    });
});
