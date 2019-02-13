import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import { Message, MessageType } from "../../../common/communication/message";
import { DifferenceImage } from "../../../common/images/difference-image";
import { DifferenceImageGenerator } from "../services/difference-image-generator.service";
import { DifferencesFinderService } from "../services/differences-finder.service";
import { FileWriterUtil } from "../services/utils/file-writer.util";
import Types from "../types";

@injectable()
export class DifferenceImageController {

    public constructor( @inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
                        @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService) { }

    public get router(): Router {
        const router: Router = Router();
        const upload: multer.Instance = this.createMulterObject();

        router.post("/",
                    upload.fields([ { name: "name", maxCount: 1 },
                                    { name: "originalImage", maxCount: 1 },
                                    { name: "modifiedImage", maxCount: 1 } ]),
                    async (req: Request, res: Response, next: NextFunction) => {
                        const name: string = req.body.name;
                        const differenceImage: DifferenceImage | undefined =
                        await this.differenceImageGenerator.generateDifferenceImage(name,
                                                                                    [
                                                                                        `uploads/${name}-originalImage.bmp`,
                                                                                        `uploads/${name}-modifiedImage.bmp`,
                                                                                    ]);

                        const message: Message = { type: MessageType.GAME_SHEET_GENERATION, body: ""};

                        if (differenceImage) {
                            const REQUIRED_DIFFERENCES: number = 7;
                            const numberOfDifferences: number = this.differencesFinder.getNumberOfDifferences(differenceImage);
                            message.body = numberOfDifferences === REQUIRED_DIFFERENCES ?
                                "" : "Les images n'ont pas exactement " + REQUIRED_DIFFERENCES + " différences, la création a été annulée";

                            if (numberOfDifferences === REQUIRED_DIFFERENCES) {
                                FileWriterUtil.writeFile(`uploads/${name}-differenceImage.bmp`, differenceImage.toArray());
                            }
                        }

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
