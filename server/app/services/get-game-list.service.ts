import { Response } from "express";
import { inject, injectable } from "inversify";
import { MongooseDocument } from "mongoose";
import "reflect-metadata";
// import { GameLists, GameSheetDescription } from "../../../common/communication/game-description";
import { GameLists, TopScore } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./dbconnection.service";
import { Message } from "../../../common/communication/message";

@injectable()
export class GetGameListService {

    public constructor(@inject(Types.DBConnectionService) private dbConnection: DBConnectionService) {
    }

    public getGameList(res: Response): void {
        const gameList: GameLists = { list2d: [], list3d: [] };

        this.dbConnection.connect()
        .then(() => {
            this.dbConnection.getGameSheets2D()
                .then((gameSheets: MongooseDocument[]): void => {
                    gameSheets.forEach((doc: MongooseDocument) => {
                        gameList.list2d.push({
                            name: doc.get("name", String),
                            preview: doc.get("preview", String),
                            topScores: doc.get("topScores", Array<TopScore>()),
                        });
                    });

                    const message: Message = {
                        title: "Game List",
                        body: JSON.stringify(gameList),
                    }
                    res.send(message);
                });
        });
    }
}
