import { Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameLists} from "../../../common/communication/game-description";
import { Message, MessageType } from "../../../common/communication/message";
import Types from "../types";
import { GetGameService } from "./get-game.service";

@injectable()
export class GetGameListService {

    public constructor(@inject(Types.GetGameService) private getGameService: GetGameService) {
    }

    public getGameList(res: Response): void {
        const gameList: GameLists = { list2d: [], list3d: [] };

        gameList.list2d = this.getGameService.getGameDescriptions();
        const message: Message = {
            type: MessageType.USERNAME_VALIDATION,
            body: JSON.stringify(gameList),
        };

        res.send(message);
    }
}
