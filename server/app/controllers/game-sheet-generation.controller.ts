import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { Message, MessageType } from "../../../common/communication/message";
import { GameSheetGenerationService } from "../services/game-sheet-generation.service";
import Types from "../types";

@injectable()
export class GameSheetGenerationController {

    public constructor(@inject(Types.GameSheetGenerationService) private gameSheetGenerationService: GameSheetGenerationService) { }

    public get router(): Router {
        const router: Router = Router();
        const upload: multer.Instance = this.createMulterObject();

        router.post("/",
                    upload.fields([ { name: "name", maxCount: 1 },
                                    { name: "originalImage", maxCount: 1 },
                                    { name: "modifiedImage", maxCount: 1 } ]),
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = { type: MessageType.GAME_SHEET_GENERATION, body: ""};

                        this.gameSheetGenerationService
                            .generateGameSheet( req.body.name,
                                                ["uploads/" + req.body.name + "-" + "originalImage.bmp",
                                                 "uploads/" + req.body.name + "-" + "modifiedImage.bmp"]);

                        res.send(message);
                    });

        return router;
    }

    private createMulterObject(): multer.Instance {
        const storage: multer.StorageEngine = multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, "uploads/");
            },
            filename: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, req.body.name + "-" + file.fieldname + ".bmp");
            },
        });

        return multer({ storage: storage });
    }
}
