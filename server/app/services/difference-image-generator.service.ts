import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class DifferenceImageGenerator {

    private readonly IMAGE_WIDTH: number = 640;
    private originalImage: BMPImage;
    private modifiedImage: BMPImage;

    public generate(originalImageData: Uint8Array, modifiedImageData: Uint8Array): BMPImage | undefined {
        this.originalImage = BMPImage.fromArray(originalImageData);
        this.modifiedImage = BMPImage.fromArray(modifiedImageData);

        if (this.originalImage.isBMP() && this.modifiedImage.isBMP()) {
            const differenceImage: BMPImage = this.originalImage.compare(this.modifiedImage);
            differenceImage.width = this.IMAGE_WIDTH;

            try {
                differenceImage.augmentBlackPixels();
            } catch (error) {
                console.error(error.message);
            }

            return differenceImage;
        }

        return undefined;
    }
}
