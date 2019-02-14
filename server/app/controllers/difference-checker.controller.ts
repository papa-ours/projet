import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { DifferenceCheckerService } from "../services/difference-checker.service";
import { Game } from "../services/game";
import { GetGameService } from "../services/get-game.service";
import Types from "../types";

@injectable()
export class DifferenceCheckerController {

    public constructor( @inject(Types.DifferenceCheckerService) private differenceChecker: DifferenceCheckerService,
                        ) {}

    public get router(): Router {
        const router: Router = Router();

        router.get( "/:id/:x/:y",
                    (req: Request, res: Response, next: NextFunction) => {
                        const getGameService: GetGameService = new GetGameService();
                        const x: number = parseInt(req.params.x, 10);
                        const y: number = parseInt(req.params.y, 10);
                        const id: string = req.params.id;
                        const game: Game | undefined = getGameService.getGame(id);

                        let isDifference: boolean = false;
                        if (game) {
                            isDifference = this.differenceChecker.isPositionDifference(x, y, game);

                            if (isDifference) {
                                game.restoreModifiedImage(x, y);
                            }
                        }

                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: isDifference.toString(),
                        };

                        res.send(message);
                    });

        return router;
    }
}
