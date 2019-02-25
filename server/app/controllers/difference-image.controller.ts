import * as aws from "aws-sdk";
import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import { REQUIRED_DIFFERENCES_1P, SERVER_ADDRESS } from "../../../common/communication/constants";
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
            upload.fields([
                {name: "name", maxCount: 1},
                {name: "originalImage", maxCount: 1},
                {name: "modifiedImage", maxCount: 1},
            ]),
            async (req: Request, res: Response, next: NextFunction) => {
                const name: string = req.body.name;
                const message: Message = {type: MessageType.GAME_SHEET_GENERATION, body: ""};

                try {
                    const differenceImage: DifferenceImage =
                    await this.differenceImageGenerator.generateDifferenceImage(
                        name,
                        [`${this.FILES_DIRECTORY}/${name}-originalImage.bmp`, `${this.FILES_DIRECTORY}/${name}-modifiedImage.bmp`],
                    );

                    if (!this.verifyNumberOfDifferences(differenceImage)) {
                        message.body =
                            "Les images n'ont pas exactement " + REQUIRED_DIFFERENCES_1P + " différences, la création a été annulée";
                    } else {
                        this.writeFile(differenceImage.toArray(), name);
                    }
                } catch (err) {
                    message.body = err.message;
                }

                res.send(message);
            },
        );

        return router;
    }

    private writeFile(data: Uint8Array, name: string): void {
        FileWriterUtil.writeFile(`uploads/${name}-differenceImage.bmp`, Buffer.from(data))
            .catch((err: Error) => {
                console.error(err);
            });
        const GAMESHEET_URL: string = `${SERVER_ADDRESS}/api/gamesheet/simple/`;
        Axios.post(GAMESHEET_URL, {name: name});
    }

    private createMulterObject(): multer.Instance {
        aws.config.update({
            accessKeyId: "AKIAI23N35EM3WRJXQRA",
            secretAccessKey: "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",
        });

        const s3: aws.S3 = new aws.S3();
        const storage: multer.StorageEngine = multerS3({
            s3: s3,
            bucket: "uploads-diffs",
            acl: "public-read",
            key: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, req.body.name + "-" + file.fieldname + ".bmp");
            },
        });

        return multer({storage: storage});
    }

    private verifyNumberOfDifferences(image: DifferenceImage): boolean {
        const numberOfDifferences: number = this.differencesFinder.getNumberOfDifferences(image);

        return (numberOfDifferences === REQUIRED_DIFFERENCES_1P);
    }
}
