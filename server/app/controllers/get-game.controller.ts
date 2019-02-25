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

        router.get(
            "/:name/:type",
            (req: Request, res: Response, next: NextFunction) => {
                const id: string = this.getGameService.createGame(req.params.name, req.params.type);
                const message: Message = {
                    type: MessageType.GAME_SHEET_GENERATION,
                    body: JSON.stringify(id),
                };

                res.send(message);
            });

        return router;
    }
}
