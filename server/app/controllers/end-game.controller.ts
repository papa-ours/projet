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

        return router;
    }
}
