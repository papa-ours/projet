import * as aws from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import Axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import { REQUIRED_DIFFERENCES_1P, SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message, MessageType } from "../../../common/communication/message";
import { DifferenceImage } from "../../../common/images/difference-image";
import { ImageTypeName } from "../../../common/images/image-type";
import { DifferenceImageGenerator } from "../services/difference-image-generator.service";
import { DifferencesFinderService } from "../services/differences-finder.service";
import { AWSFilesUtil } from "../services/utils/aws-files.util";
import { S3Util } from "../services/utils/s3.util";
import Types from "../types";

@injectable()
export class DifferenceImageController {

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
                {name: ImageTypeName.Original, maxCount: 1},
                {name: ImageTypeName.Modified, maxCount: 1},
            ]),
            async (req: Request, res: Response, next: NextFunction) => {
                const name: string = req.body.name;
                const message: Message = {type: MessageType.GAME_SHEET_GENERATION, body: ""};

                try {
                    const differenceImage: DifferenceImage =
                    await this.differenceImageGenerator.generateDifferenceImage(
                        name,
                        [`${name}-${ImageTypeName.Original}.bmp`, `${name}-${ImageTypeName.Modified}.bmp`],
                    );

                    if (!this.verifyNumberOfDifferences(differenceImage)) {
                        message.body =
                            "Les images n'ont pas exactement " + REQUIRED_DIFFERENCES_1P + " différences, la création a été annulée";
                    } else {
                        await this.writeFile(differenceImage.toArray(), name);
                        const GAMESHEET_URL: string = `${SERVER_ADDRESS}/api/gamesheet/simple/`;
                        Axios.post(GAMESHEET_URL, {name: name});
                    }
                } catch (err) {
                    message.body = err.message;
                }

                res.send(message);
            },
        );

        return router;
    }

    private async writeFile(data: Uint8Array, name: string): Promise<PromiseResult<aws.S3.PutObjectOutput, aws.AWSError>> {
         return AWSFilesUtil.writeFile(`${name}-${ImageTypeName.Difference}.bmp`, Buffer.from(data));
    }

    private createMulterObject(): multer.Instance {
        const s3Util: S3Util = new S3Util();
        const BUCKET_NAME: string = "uploads-diffs";
        const BUCKET_ACL: string = "public-read";

        const storage: multer.StorageEngine = multerS3({
            s3: s3Util.s3,
            bucket: BUCKET_NAME,
            acl: BUCKET_ACL,
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
