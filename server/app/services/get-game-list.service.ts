import { injectable } from "inversify";
import "reflect-metadata";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import { DBConnectionService } from "./db-connection.service";

@injectable()
export class GetGameListService {

    public async getGameList(): Promise<GameLists> {
        const db: DBConnectionService = DBConnectionService.getInstance();
        const simpleGameSheets: GameSheet[] = await db.getGameSheets(GameType.Simple);
        const freeGameSheets: GameSheet[] = await db.getGameSheets(GameType.Free);

        return new Promise((resolve: (gameLists: GameLists) => void) => {
            resolve({
                list2d: simpleGameSheets,
                list3d: freeGameSheets,
            });
        });
    }
}
