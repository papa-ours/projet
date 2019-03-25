import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGameService } from "../services/get-game.service";
import { ScoreUpdaterService } from "../services/score-updater.service";
import Types from "../types";

@injectable()
export class EndGameController {

    private static readonly BASE_10: number = 10;

    public constructor(
        @inject(Types.ScoreUpdaterService) private scoreUpdaterService: ScoreUpdaterService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/:id/:name/:time",
            async (req: Request, res: Response) => {
                Promise.all([
                    this.scoreUpdaterService.putSoloScoreAndGetPosition(
                        req.params.id,
                        req.params.name,
                        parseInt(req.params.time, EndGameController.BASE_10)),
                    this.getGameService.removeGame(req.params.id),
                ]).then((result: [number, {}]) => {
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
