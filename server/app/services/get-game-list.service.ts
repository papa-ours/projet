import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameLists, GameType} from "../../../common/communication/game-description";
import Types from "../types";
import { GetGameService } from "./get-game.service";

@injectable()
export class GetGameListService {

    public constructor(@inject(Types.GetGameService) private getGameService: GetGameService) {
    }

    public getGameList(): GameLists {
        return {
            list2d: this.getGameService.getGameDescriptions(GameType.Simple),
            list3d: this.getGameService.getGameDescriptions(GameType.Free),
        };
    }
}
