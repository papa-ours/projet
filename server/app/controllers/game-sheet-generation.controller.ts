import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import { Message, MessageType } from "../../../common/communication/message";

@injectable()
export class GameSheetGenerationController {

    public get router(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = { type: MessageType.GAME_SHEET_GENERATION, body: ""};

                        res.send(message);
                    });

        return router;
    }
}
