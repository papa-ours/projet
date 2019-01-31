import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";

@injectable()
export class DifferenceImageGenerator {

    private readonly PIXEL_LENGTH: number = 3;

    public generate(req: Request, res: Response): void {
        const originalImageData: Uint8Array =
            JSON.parse("[" + req.body.originalImage + "]");
        const modifiedImageData: Uint8Array =
            JSON.parse("[" + req.body.modifiedImage + "]");

        let message: Message = {
            title: "Image Message",
            body: "error",
        }
        if (this.isBMP(originalImageData) && this.isBMP(modifiedImageData)) {

            const imageData: number[] = this.getDifferenceImage(originalImageData, modifiedImageData);
            message.body = imageData.toString();
        }
        res.send(message);
    }

    private isBMP(imageData: Uint8Array): boolean {
        const B_CODE: number = 66;
        const M_CODE: number = 77;

        return (imageData[0] === B_CODE && imageData[1] === M_CODE);
    }

    private getDifferenceImage(originalImage: Uint8Array, modifiedImage: Uint8Array): number[] {
        return this.calculateDifferenceFromImages(originalImage, modifiedImage);
    }

    private calculateDifferenceFromImages(originalImage: Uint8Array, modifiedImage: Uint8Array): number[] {
        const OFF_SET_LOCATION: number = 14;
        const WHITE: number = 255;
        const BLACK: number = 0;
        const OFF_SET_ORIGINAL_IMAGE: number = originalImage[OFF_SET_LOCATION];
        
        let differenceImage: number[] = Array.from(originalImage);

        for ( let i = 0; i < originalImage.length - OFF_SET_ORIGINAL_IMAGE / this.PIXEL_LENGTH; i += this.PIXEL_LENGTH ) {
            const originalImagePixel = originalImage.slice(i, i + this.PIXEL_LENGTH);
            const modifiedImagePixel = modifiedImage.slice(i, i + this.PIXEL_LENGTH);
            const color = this.isPixelEqual(originalImagePixel, modifiedImagePixel) ? WHITE : BLACK;
            differenceImage.splice(i, i + this.PIXEL_LENGTH, color, color, color);
        }


        return differenceImage;

    }
    
    private isPixelEqual(firstPixel: Uint8Array, secondPixel: Uint8Array): Boolean {
        return firstPixel.toString() === secondPixel.toString();
    }
    
}
