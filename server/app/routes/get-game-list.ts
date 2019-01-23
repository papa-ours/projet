import { Request, Response } from "express";
import "reflect-metadata";
import { injectable } from "inversify";
import { GameSheetDescription, GameLists } from "../../../common/communication/game-description"

@injectable() 
export class GetGameList {

    public sendGameList(req: Request, res: Response): void {
        res.send({
            title: "get-game-list",
            body: JSON.stringify(this.getGameList())
        });
    }

    private getGameList(): GameLists {
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
            list3d: [placeholder, placeholder]
        }
    }
}