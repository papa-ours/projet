import Axios from "axios";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameLists, GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { WaitingRoom } from "./game/waiting-room";

@injectable()
export class GetGameListService {

    public constructor(@inject(Types.DBConnectionService) private db: DBConnectionService) {}

    public async getGameList(): Promise<GameLists> {
        const types: GameType[] = [GameType.Simple, GameType.Free];
        const gameSheets: Map<GameType, GameSheet[]> = await this.setHasWaitingRoom(await this.db.getGameSheets(types));

        return {
            list2d: gameSheets.get(GameType.Simple) as GameSheet[],
            list3d: gameSheets.get(GameType.Free) as GameSheet[],
        };
    }

    private async setHasWaitingRoom(gameSheets: Map<GameType, GameSheet[]>): Promise<Map<GameType, GameSheet[]>> {
        const waitingRooms: WaitingRoom[][] = (await Axios.get(`${SERVER_ADDRESS}/api/game/waitingRoom/listAll`)).data;

        gameSheets.forEach((list: GameSheet[], type: number) => {
            list.forEach((gameSheet: GameSheet) => {
                    const index: number = waitingRooms[type]
                        .findIndex((waitingRoom: WaitingRoom) => gameSheet.id === waitingRoom.gameSheetId);
                    if (index !== -1) {
                        gameSheet.hasWaitingRoom = true;
                    }
                });
            });

        return gameSheets;
    }
}
