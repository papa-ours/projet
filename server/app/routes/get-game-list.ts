import { Request, Response } from "express";
import "reflect-metadata";
import { injectable } from "inversify";
import { GameSheetDescription } from "../../../common/communication/game-description"

@injectable() 
export class GetGameList {

    public sendGameList(req: Request, res: Response): void {
        res.send({
            title: "get-game-list",
            body: JSON.stringify(this.getGameList())
        });
    }

    private getGameList(): GameSheetDescription[] {
        const placeholder: GameSheetDescription = {
            name: "Placeholder",
            preview: "../../assets/preview-placeholder.png",
            topScores1v1: ["3:51 Username", "3:51 Username", "3:51 Username"],
            topScoresSolo: ["3:51 Username", "3:51 Username", "3:51 Username"],
        };
    
        return [placeholder, placeholder, placeholder];
    }
}