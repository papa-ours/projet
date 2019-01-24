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

        const message: Message = {
            title: "Image Message",
            body: "error",
        };
<<<<<<< HEAD

=======
>>>>>>> 10174622867203330da5458cd20ace6c19a34c03
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
        const differenceImage: number[] = Array.from(originalImage);

        for ( let i: number = OFF_SET_ORIGINAL_IMAGE;
             i < originalImage.length ; i += this.PIXEL_LENGTH ) {

            const originalImagePixel: Uint8Array = originalImage.slice(i, i + this.PIXEL_LENGTH);
            const modifiedImagePixel:  Uint8Array = modifiedImage.slice(i, i + this.PIXEL_LENGTH);
            const color: number = this.isPixelEqual(originalImagePixel, modifiedImagePixel) ? WHITE : BLACK;
            differenceImage.splice(i, this.PIXEL_LENGTH, color, color, color);
        }

        return differenceImage;
    }

    private isPixelEqual(firstPixel: Uint8Array, secondPixel: Uint8Array): Boolean {
        return firstPixel.toString() === secondPixel.toString();
    }

}
