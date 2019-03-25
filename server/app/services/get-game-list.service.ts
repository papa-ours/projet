import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
@injectable()
export class GetGameListService {

    public constructor(@inject(Types.DBConnectionService) private db: DBConnectionService) {}

    public async getGameList(): Promise<GameLists> {
        const types: GameType[] = [GameType.Simple, GameType.Free];
        const gameSheets: Map<GameType, GameSheet[]> = await this.db.getGameSheets(types);

        return {
            list2d: gameSheets.get(GameType.Simple) as GameSheet[],
            list3d: gameSheets.get(GameType.Free) as GameSheet[],
        };
    }
}
