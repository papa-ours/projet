import { injectable, inject } from "inversify";
import "reflect-metadata";
import { GameLists, GameSheetDescription } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./dbconnection.service";

@injectable()
export class GetGameListService {

    public constructor(@inject(Types.DBConnectionService) private dbConnection: DBConnectionService) {
    }

    public getGameList(): GameLists {
        const placeholder: GameSheetDescription = {
            name: "Placeholder",
            preview: "../../assets/preview-placeholder.png",
            topScores: [
                { solo: "3:51 Solo", pvp: "3:51 1v1" },
                { solo: "3:51 Solo", pvp: "3:51 1v1" },
                { solo: "3:51 Solo", pvp: "3:51 1v1" },
            ],
        };

        return {
            list2d: [placeholder, placeholder, placeholder],
            list3d: [placeholder, placeholder],
        };
    }
}
