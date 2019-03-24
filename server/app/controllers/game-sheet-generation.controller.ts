import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { GameType } from "../../../common/communication/game-description";
import { MessageType } from "../../../common/communication/message";
import { GameSheetGenerationService } from "../services/game-sheet-generation.service";
import { ScoreUpdaterService } from "../services/score-updater.service";
import Types from "../types";

@injectable()
export class GameSheetGenerationController {

    public constructor(
        @inject(Types.GameSheetGenerationService) private gameSheetGenerationService: GameSheetGenerationService,
        @inject(Types.ScoreUpdaterService) private scoreUpdaterService: ScoreUpdaterService,
    ) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.post(
            "/simple/",
            (req: Request, res: Response, next: NextFunction) => {
                this.gameSheetGenerationService.createGameSheet(req.body.name, GameType.Simple);
                res.send({
                    type: MessageType.GAME_SHEET_GENERATION,
                    message: "",
                });
            });

        router.post(
            "/free/",
            (req: Request, res: Response, next: NextFunction) => {
                this.gameSheetGenerationService.createGameSheet(req.body.name, GameType.Free);
                res.send({
                    type: MessageType.GAME_SHEET_GENERATION,
                    message: "",
                });
            });

        router.put(
            "/score/:id/:name/:time",
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await this.scoreUpdaterService.putScore(req.body.id, req.body.name, req.body.time as number);
                    res.send({
                        type: MessageType.SCORE_UPDATE,
                        message: "",
                    });
                } catch (error) {
                    res.send({
                        type: MessageType.SCORE_UPDATE,
                        message: error,
                    });
                }
            });

        return router;
    }
}
