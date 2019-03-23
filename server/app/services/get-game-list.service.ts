import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
@injectable()
export class GetGameListService {

    public constructor(@inject(Types.DBConnectionService) private db: DBConnectionService) {}

    public async getGameList(): Promise<GameLists> {
        await this.db.connect();
        const types: GameType[] = [GameType.Simple, GameType.Free];
        const gameSheets: GameSheet[][] = await Promise.all(types.map(
            async (type: GameType) => this.getGameSheets(type)),
        );
        await this.db.closeConnection();

        return new Promise((resolve: (gameLists: GameLists) => void) => {
            resolve({
                list2d: gameSheets[GameType.Simple],
                list3d: gameSheets[GameType.Free],
            });
        });
    }

    public async getGameSheets(type: GameType): Promise<GameSheet[]> {
        return this.db.getGameSheets(type);
    }
}
