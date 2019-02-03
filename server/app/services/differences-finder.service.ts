import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";
import { Position } from "./utils/circle-area";
import { Pixel } from "./utils/pixel";

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

        const stack: number[] = [];
        for (let i: number = 0; i < this.isPixelVisited.length; i++) {
            if (!this.isPixelVisited[i]) {
                if (this.image.pixelAt(i).equals(Pixel.BLACK_PIXEL)) {
                    stack.push(i);
                    differencesCount++;
                    while (stack.length > 0) {
                        this.explorePixel(stack.pop() as number, stack);
                    }
                } else {
                    this.isPixelVisited[i] = true;
                }
            }
        }

        return differencesCount;
    }

    private explorePixel(index: number, pixelsToVisit: number[]): void {
        this.isPixelVisited[index] = true;
        const currentPosition: Position = this.image.getPosition(index);
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    const pixelToVisitPosition: Position = {
                        i: currentPosition.i + i,
                        j: currentPosition.j + j,
                    };
                    const pixelToVisitIndex: number = this.image.getIndex(pixelToVisitPosition);

                    if (pixelToVisitIndex >= 0 && pixelToVisitIndex < this.isPixelVisited.length) {
                        if (this.image.pixelAt(pixelToVisitIndex).equals(Pixel.BLACK_PIXEL) && !this.isPixelVisited[pixelToVisitIndex]) {
                            if (!pixelsToVisit.find((val: number) => val === pixelToVisitIndex)) {
                                pixelsToVisit.push(pixelToVisitIndex);
                            }
                        }
                    }
                }
            }
        }
    }
}
