import Axios from "axios";
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

    private readonly FILES_DIRECTORY: string = "uploads/";

    public constructor(
        @inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
        @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService,
    ) { }

    public get router(): Router {
        const router: Router = Router();
        const upload: multer.Instance = this.createMulterObject();

        router.post(
            "/",
            upload.fields([ {name: "name", maxCount: 1},
                            {name: "originalImage", maxCount: 1},
                            {name: "modifiedImage", maxCount: 1} ]),
            async (req: Request, res: Response, next: NextFunction) => {
                const name: string = req.body.name;
                const message: Message = {type: MessageType.GAME_SHEET_GENERATION, body: ""};

                try {
                    const differenceImage: DifferenceImage =
                    await this.differenceImageGenerator.generateDifferenceImage(
                        name,
                        [`${this.FILES_DIRECTORY}/${name}-originalImage.bmp`, `${this.FILES_DIRECTORY}/${name}-modifiedImage.bmp`],
                    );

                    this.verifyNumberOfDifferences(differenceImage);

                    FileWriterUtil.writeFile(`uploads/${name}-differenceImage.bmp`, differenceImage.toArray());
                    const GAMESHEET_URL: string = "http://localhost:3000/api/gamesheet/simple/";
                    Axios.post(GAMESHEET_URL, {name: name});
                } catch (err) {
                    message.body = err.message;
                }

                res.send(message);
            },
        );

        return router;
    }

    private createMulterObject(): multer.Instance {
        const storage: multer.StorageEngine = multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, this.FILES_DIRECTORY);
            },
            filename: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, req.body.name + "-" + file.fieldname + ".bmp");
            },
        });

        return multer({storage: storage});
    }

    private verifyNumberOfDifferences(image: DifferenceImage): void {
        const REQUIRED_DIFFERENCES: number = 7;
        const numberOfDifferences: number = this.differencesFinder.getNumberOfDifferences(image);
        if (numberOfDifferences !== REQUIRED_DIFFERENCES) {
            throw new Error("Les images n'ont pas exactement " + REQUIRED_DIFFERENCES + " différences, la création a été annulée");
        }
    }
}
