import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { Message } from "../../../common/communication/message";
import { GameSheetGenerationService } from "../services/game-sheet-generation.service";
import Types from "../types";

@injectable()
export class GameSheetGenerationController {

    public constructor(@inject(Types.GameSheetGenerationService) private gameSheetGenerationService: GameSheetGenerationService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/",
                    (req: Request, res: Response, next: NextFunction) => {
                        const name: string = req.body.name;
                        const originalImageData: Uint8Array = JSON.parse("[" + req.body.originalImage + "]");
                        const modifiedImageData: Uint8Array = JSON.parse("[" + req.body.modifiedImage + "]");

                        const message: Message =
                            this.gameSheetGenerationService.generateGameSheet(name, originalImageData, modifiedImageData);

                        res.send(message);
                    });

        return router;
    }
}
