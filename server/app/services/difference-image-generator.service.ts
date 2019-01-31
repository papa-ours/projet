import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { Color } from "./enums";
import { CHUNK_RELATIVE_POSITIONS, Position  } from "./utils/circle-area";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class DifferenceImageGenerator {

    private readonly IMAGE_WIDTH: number = 640;
    private originalImage: BMPImage;
    private modifiedImage: BMPImage;

    public generate(req: Request, res: Response): void {
        const originalImageData: Uint8Array = JSON.parse("[" + req.body.originalImage + "]");
        const modifiedImageData: Uint8Array = JSON.parse("[" + req.body.modifiedImage + "]");

        this.originalImage = BMPImage.fromArray(originalImageData);
        this.modifiedImage = BMPImage.fromArray(modifiedImageData);

        const message: Message = {
            title: "Image Message",
            body: "error",
        };

        if (this.originalImage.isBMP() && this.modifiedImage.isBMP()) {
            const differenceImage: BMPImage = this.originalImage.compare(this.modifiedImage);
            differenceImage.width = this.IMAGE_WIDTH;

            try {
                differenceImage.augmentBlackPixels();
            } catch (error) {
                console.error(error.message);
            }

            message.body = differenceImage.toArray().toString();
        }

        res.send(message);
    }
}
