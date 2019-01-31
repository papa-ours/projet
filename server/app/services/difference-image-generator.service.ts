import { Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";
import { Message } from "../../../common/communication/message";
import { Color } from "./enums";
import { CHUNK_RELATIVE_POSITIONS, Position  } from "./utils/circle-area";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class DifferenceImageGenerator {

    private readonly PIXEL_LENGTH: number = 3;
    private readonly IMAGE_WIDTH: number = 640;
    private readonly OFF_SET_LOCATION: number = 10;
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

            const imageData: Uint8Array = this.originalImage.compare(this.modifiedImage).toArray();
            message.body = imageData.toString();
        }
        res.send(message);
    }

    private calculateDifferenceFromImages(originalImage: Uint8Array, modifiedImage: Uint8Array): number[] {
        const OFF_SET_ORIGINAL_IMAGE: number = originalImage[this.OFF_SET_LOCATION];
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
            const centerPosition: Position = this.resolvePosition(position);

            for (const relativePoition of CHUNK_RELATIVE_POSITIONS) {

                const pixelToPlacePosition: Position = { 
                    i: centerPosition.i + relativePoition.i,
                    j: centerPosition.j + relativePoition.j,
                };

                const index: number = this.resolveIndex(pixelToPlacePosition);
                if (index >= differenceImage[this.OFF_SET_LOCATION] && index < differenceImage.length) {
                    differenceImage.splice(index, this.PIXEL_LENGTH, Color.Black, Color.Black, Color.Black);
                }

            }
        }

        return differenceImage;
    }

    private resolveIndex(position: Position): number {
        // il faut multiplier par PIXEL_LENGTH pour avoir la position du pixel
        // (j * this.IMAGE_WIDTH + i) est incomplet
        return (position.j * this.IMAGE_WIDTH + position.i) * this.PIXEL_LENGTH;
    }

    private resolvePosition(index: number): Position {
        // il faut diviser par PIXEL_LENGTH pour passer de RGB a PIXEL
        index = Math.floor(index / this.PIXEL_LENGTH) + index % this.PIXEL_LENGTH;

        return {
            i: ( index % this.IMAGE_WIDTH ) ,
            j: Math.floor(index / this.IMAGE_WIDTH) ,
        };
    }

}
