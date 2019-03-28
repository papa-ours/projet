import { NextFunction } from "connect";
import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameSheet } from "../../../common/communication/game-description";
import { AbstractGame } from "../services/game/game";
import { GetGameService } from "../services/get-game.service";
import { ScoreUpdaterService } from "../services/score-updater.service";
import { Socket } from "../socket";
import Types from "../types";

@injectable()
export class EndGameController {

    private static readonly BASE_10: number = 10;

    public constructor(
        @inject(Types.ScoreUpdaterService) private scoreUpdaterService: ScoreUpdaterService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
        @inject(Types.Socket) private socket: Socket,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/",
            async (req: Request, res: Response, next: NextFunction) => {
                const game: AbstractGame = this.getGameService.getGame(req.body.gameId);
                Promise.all([
                    this.scoreUpdaterService.putScore(
                        game.sheetId,
                        game.name,
                        parseInt(req.body.time, EndGameController.BASE_10),
                        game.gameMode,
                    ).then((gameSheet: GameSheet) => {
                        const position: number = this.scoreUpdaterService.getPosition(gameSheet, req.body.time, game.gameMode);
                        if (position !== -1) {
                            this.socket.sendBestTimeMessage(game.username, position, game.name, game.gameMode);
                        }
                    }),
                    this.getGameService.removeGame(req.body.gameId),
                ]).then(() => {
                    res.send({
                        body: "",
                    });
                }).catch((error: Error) => {
                    console.error(error);
                    next(error);
                });
            },
        );

        return router;
    }
}
