import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { Message } from "../../../common/communication/message";
import { GameSheetGenerationService } from "../services/game-sheet-generation.service";
import Types from "../types";

@injectable()
export class GameSheetGenerationController {

    public constructor(@inject(Types.GameSheetGenerationService) private gameSheetGenerationService: GameSheetGenerationService) { }

    public get router(): Router {
        const router: Router = Router();
        const upload: multer.Instance = multer({dest: "uploads/"});

        router.post("/",
                    upload.fields([ { name: "name", maxCount: 1 },
                                    { name: "originalImage", maxCount: 1 },
                                    { name: "modifiedImage", maxCount: 1 } ]),
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message =
                            this.gameSheetGenerationService.generateGameSheet(  name,
                                                                                req.files["originalImage"],
                                                                                req.files["modifiedImage"]);

                        res.send(message);
                    });

        return router;
    }
}
