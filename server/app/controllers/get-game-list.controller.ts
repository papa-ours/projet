import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";
import { GetGameListService } from "../services/get-game-list.service";
import Types from "../types";

@injectable()
export class GetGameListController {

    public constructor(@inject(Types.GetGameListService) private getGameListService: GetGameListService) { }

    public get router(): Router {
        const router: Router = Router();

        router.get(
            "/",
            async (req: Request, res: Response, next: NextFunction) => {
                const message: Message = {
                    type: MessageType.USERNAME_VALIDATION,
                    body: JSON.stringify(await this.getGameListService.getGameList()),
                };

                res.send(message);
            });

        return router;
    }
}
