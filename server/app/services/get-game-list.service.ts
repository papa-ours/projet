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
        const gameSheets: Map<GameType, GameSheet[]> = await this.db.getGameSheets(types);

        const waitingRooms: WaitingRoom[][] = (await Axios.get(`${SERVER_ADDRESS}/api/game/waitingRoom/listAll`)).data;

        waitingRooms.forEach((list: WaitingRoom[]) => {
            list.forEach((waitingRoom: WaitingRoom) => {
                const gameSheetList: GameSheet[] | undefined = gameSheets.get(waitingRoom.type);

                if (gameSheetList) {
                    const index: number = gameSheetList.findIndex((gs: GameSheet) => gs.id === waitingRoom.gameSheetId);
                    if (index !== -1) {
                        (gameSheets.get(waitingRoom.type) as GameSheet[])[index].hasWaitingRoom = true;
                    }
                }

            });
        });

        return {
            list2d: gameSheets.get(GameType.Simple) as GameSheet[],
            list3d: gameSheets.get(GameType.Free) as GameSheet[],
        };
    }
}
