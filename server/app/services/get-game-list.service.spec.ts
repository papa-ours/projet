import { expect } from "chai";
import { GameLists } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import Types from "../types";
import { GetGameListService } from "./get-game-list.service";

describe("get game list", () => {
    const getGameListService: GetGameListService = container.get<GetGameListService>(Types.GetGameListService);
    it("should return the game list properly", () => {
        getGameListService.getGameList().then((result: GameLists) => {
            expect(result).to.not.equals(undefined);
        })
        .catch((error: Error) => console.error(error.message));
    });
});
