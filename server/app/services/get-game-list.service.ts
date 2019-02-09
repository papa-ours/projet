import { Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { GameLists} from "../../../common/communication/game-description";
import { Message, MessageType } from "../../../common/communication/message";

@injectable()
export class GetGameListService {

    public getGameList(res: Response): void {
        const gameList: GameLists = { list2d: [], list3d: [] };

        const message: Message = {
            type: MessageType.USERNAME_VALIDATION,
            body: JSON.stringify(gameList),
        };

        res.send(message);
    }
}
