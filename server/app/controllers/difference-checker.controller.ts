import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";

@injectable()
export class DifferenceCheckerController {

    public get router(): Router {
        const router: Router = Router();

        router.get("/:id/:x/:y", (req: Request, res: Response, next: NextFunction) => {

            const message: Message = {
                type: MessageType.GAME_SHEET_GENERATION,
                body: false.toString(),
            };

            res.send(message);
        });

        return router;
    }
}
