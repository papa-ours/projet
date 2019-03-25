import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
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
                    this.scoreUpdaterService.putSoloScoreAndGetPosition(
                        req.params.sheetId,
                        req.params.name,
                        parseInt(req.params.time, EndGameController.BASE_10)),
                    this.getGameService.removeGame(req.params.gameId),
                ]).then((result: [number, {}]) => {
                    const PODIUM: number = 3;
                    if (result[0] < PODIUM) {
                        this.socket.sendBestTimeMessage(game.username, result[0] + 1, game.username, game.gameMode);
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
