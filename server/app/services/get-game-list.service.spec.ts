import Axios, { AxiosResponse } from "axios";
import { expect } from "chai";
import { GameLists } from "../../../common/communication/game-description";

describe("get game list", () => {

    it("should actually test something", () => {
        expect(true).to.equals(true);
    });

    it("should return the game list properly", async () => {
        const expected: GameLists = { list2d: [], list3d: [] };

        const GAMELIST_URL: string = "http://localhost:3000/api/gamelist/";
        Axios.get(GAMELIST_URL)
        .then((res: AxiosResponse) => {
            const result: GameLists = JSON.parse(res.data.body);
            expect(expected).to.deep.equals(result);
        });
    });
});
