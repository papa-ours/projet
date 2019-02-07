import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { GetGameService } from "../services/get-game.service";
import Types from "../types";

@injectable()
export class GetGameController {

    public constructor(@inject(Types.GetGameService) private getGameService: GetGameService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get("/:id",
                   (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = {
                            type: MessageType.GAME_SHEET_GENERATION,
                            body: JSON.stringify(this.getGameService.getGame(req.params.id)),
                        };

                        res.send(message);
                   });

        return router;
    }
}
