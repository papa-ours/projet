import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";
import { Pixel } from "./utils/pixel";
import { Position } from "./utils/circle-area";

@injectable()
export class DifferencesFinderService {

    private isPixelVisited: boolean[] = [];
    private image: BMPImage;

    public getNumberOfDifferences(image: BMPImage): number {
        if (!image) {
            throw Error("Image must be defined");
        }
        this.image = image;

        let differencesCount: number = 0;
        this.isPixelVisited = new Array(this.image.size()).fill(false);

        this.isPixelVisited.forEach((isCurrentPixelVisited: boolean, index: number) => {
            if (!isCurrentPixelVisited && this.image.pixelAt(index).equals(Pixel.BLACK_PIXEL)) {
                this.explorePixel(index);
                differencesCount++;
            }
        });

        return differencesCount;
    }

    private explorePixel(index: number): void {
        if (this.image.pixelAt(index).equals(Pixel.WHITE_PIXEL) || this.isPixelVisited[index] ||
            index < 0 || index >= this.isPixelVisited.length) {
            return;
        }

        this.isPixelVisited[index] = true;

        const currentPosition: Position = this.image.resolvePosition(index);
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                const pixelToVisitPosition: Position = {
                    i: currentPosition.i + i,
                    j: currentPosition.j + j,
                };

                const pixelToVisitIndex: number = this.image.resolveIndex(pixelToVisitPosition);
                this.explorePixel(pixelToVisitIndex);
            }
        }
    }
}
