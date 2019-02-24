import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import { Game } from "../services/game";
import { GetGameService } from "../services/get-game.service";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor(@inject(Types.DifferenceCheckerService) private differenceChecker: DifferenceCheckerService) {

    }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/:id/:x/:y",
            async(req: Request, res: Response, next: NextFunction) => {
                const getGameService: GetGameService = new GetGameService();
                const x: number = parseInt(req.params.x, 10);
                const y: number = parseInt(req.params.y, 10);
                const id: string = req.params.id;

                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: "",
                };

                try {
                    const game: Game = getGameService.getGame(id);

                    let isDifference: boolean = false;
                    isDifference = this.differenceChecker.isPositionDifference(x, y, game);

                    if (isDifference) {
                        await game.restoreModifiedImage(x, y);
                    }

                    message.body = isDifference.toString();
                } catch (err) {
                    message.body = err.message;
                }

                res.send(message);
            });

        return router;
    }
}
