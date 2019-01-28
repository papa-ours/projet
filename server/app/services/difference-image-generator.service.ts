import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { CHUNK_COLORS, CHUNK_RELATIVE_POSITION, Position  } from "./circle-area";
import { Color } from "./enums";

@injectable()
export class DifferenceImageGenerator {

    private readonly PIXEL_LENGTH: number = 3;
    private readonly IMAGE_WIDTH: number = 640;

    public generate(req: Request, res: Response): void {
        const originalImageData: Uint8Array =
            JSON.parse("[" + req.body.originalImage + "]");
        const modifiedImageData: Uint8Array =
            JSON.parse("[" + req.body.modifiedImage + "]");

        const message: Message = {
            title: "Image Message",
            body: "error",
        };

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
        const OFF_SET_LOCATION: number = 10;
        const OFF_SET_ORIGINAL_IMAGE: number = originalImage[OFF_SET_LOCATION];
        const differenceImage: number[] = Array.from(originalImage);
        const differencesPosition: number[] = [];
        for ( let i: number = OFF_SET_ORIGINAL_IMAGE;
             i < originalImage.length ; i += this.PIXEL_LENGTH ) {

            const originalImagePixel: Uint8Array = originalImage.slice(i, i + this.PIXEL_LENGTH);
            const modifiedImagePixel:  Uint8Array = modifiedImage.slice(i, i + this.PIXEL_LENGTH);
            const color: number = this.isPixelEqual(originalImagePixel, modifiedImagePixel) ? Color.White : Color.Black;
            if (color === Color.Black) {
                differencesPosition.push(i);
            }
            differenceImage.splice(i, this.PIXEL_LENGTH, color, color, color);
        }

        return this.augmentPixelsDifferences(differenceImage, differencesPosition);
    }

    private isPixelEqual(firstPixel: Uint8Array, secondPixel: Uint8Array): Boolean {
        return firstPixel.toString() === secondPixel.toString();
    }

    private augmentPixelsDifferences(differenceImage: number[], differencesPosition: number[]): number[] {
        for (const position of differencesPosition) {
            let colorIndex: number = 0;
            for (const relativePoition of CHUNK_RELATIVE_POSITION) {
                const color: number = CHUNK_COLORS[colorIndex++];
                const centerPosition: Position = this.resolvePosition(position);
                const index: number = this.resolveIndex(centerPosition.i + relativePoition.i , centerPosition.j + relativePoition.j );
                if (color === Color.Black) {
                    differenceImage.splice(index, this.PIXEL_LENGTH, color, color, color);
                }
            }
        }

        return differenceImage;
    }

    private resolveIndex(i: number, j: number): number {
        // il faut multiplier par PIXEL_LENGTH pour avoir la position du pixel
        // (j * this.IMAGE_WIDTH + i) est incomplet
        return (j * this.IMAGE_WIDTH + i) * this.PIXEL_LENGTH;
    }

    private resolvePosition(index: number): Position {
        // il faut diviser par PIXEL_LENGTH pour passer de RGB a PIXEL
        index = index / this.PIXEL_LENGTH ;

        return {
            i: ( index % this.IMAGE_WIDTH ) ,
            j: Math.floor(index / this.IMAGE_WIDTH) ,
        };
    }

}
