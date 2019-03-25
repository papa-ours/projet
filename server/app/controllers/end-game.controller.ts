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
            "/:sheetId/:gameId/:name/:time",
            async (req: Request, res: Response) => {
                const game: AbstractGame = this.getGameService.getGame(req.params.gameId);
                Promise.all([
                    this.scoreUpdaterService.putSoloScore(
                        req.params.sheetId,
                        req.params.name,
                        parseInt(req.params.time, EndGameController.BASE_10),
                    ).then((gameSheet: GameSheet) => this.scoreUpdaterService.getPosition(gameSheet, req.params.time)),
                    this.getGameService.removeGame(req.params.gameId),
                ]).then((result: [number, {}]) => {
                    if (result[0] !== -1) {
                        this.socket.sendBestTimeMessage(game.username, result[0] + 1, game.name, game.gameMode);
                    }
                    res.send({
                        body: "",
                    });
                }).catch((error: Error) => {
                    res.send({
                        body: error,
                    });

                });
            },
        );

        return router;
    }
}
