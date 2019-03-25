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
            async (req: Request, res: Response) => {
                const game: AbstractGame = this.getGameService.getGame(req.body.game.gameId);
                Promise.all([
                    this.scoreUpdaterService.putScore(
                        req.body.game.sheetId,
                        req.body.game.name,
                        parseInt(req.body.time, EndGameController.BASE_10),
                        req.body.game.mode),
                    this.getGameService.removeGame(req.body.game.gameId),
                ]).then((result: [GameSheet, {}]) => {
                    const position: number = this.scoreUpdaterService.getPosition(result[0], req.body.time, req.body.game.mode);
                    if (position !== -1) {
                        this.socket.sendBestTimeMessage(game.username, position + 1, game.name, game.gameMode);
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
