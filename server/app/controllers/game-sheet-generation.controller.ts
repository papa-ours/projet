import { NextFunction, Request, Response, Router } from "express";
import { injectable } from "inversify";
import * as multer from "multer";
import { Message, MessageType } from "../../../common/communication/message";

@injectable()
export class GameSheetGenerationController {

    public get router(): Router {
        const router: Router = Router();
        const upload: multer.Instance = this.createMulterObject();

        router.post("/",
                    upload.fields([ { name: "name", maxCount: 1 },
                                    { name: "originalImage", maxCount: 1 },
                                    { name: "modifiedImage", maxCount: 1 } ]),
                    (req: Request, res: Response, next: NextFunction) => {
                        const message: Message = { type: MessageType.GAME_SHEET_GENERATION, body: ""};

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
