import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GetGameService } from "../services/get-game.service";
import { ScoreUpdaterService } from "../services/score-updater.service";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor(
        @inject(Types.ScoreUpdaterService) private scoreUpdaterService: ScoreUpdaterService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/:id/:name/:time",
            async (req: Request, res: Response) => {
                try {
                    await Promise.all([
                        this.scoreUpdaterService.putScore(req.body.id, req.body.name, req.body.time),
                        this.getGameService.getGame(req.body.id).cleanUp(),
                    ]);
                    res.send({
                        body: "",
                    });
                } catch (error) {
                    res.send({
                        body: error,
                    });
                }
            },
        );

        return router;
    }
}
