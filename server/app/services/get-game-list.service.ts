import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
@injectable()
export class GetGameListService {

    private constructor(@inject(Types.DBConnectionService) private db: DBConnectionService) {}

    public async getGameList(): Promise<GameLists> {
        const simpleGameSheets: GameSheet[] = await this.db.getGameSheets(GameType.Simple);
        const freeGameSheets: GameSheet[] = await this.db.getGameSheets(GameType.Free);
        this.db.closeConnection();

        return new Promise((resolve: (gameLists: GameLists) => void) => {
            resolve({
                list2d: simpleGameSheets,
                list3d: freeGameSheets,
            });
        });
    }
}
