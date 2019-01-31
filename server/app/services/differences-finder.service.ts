import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";
import { Pixel } from "./utils/pixel";
import { Position } from "./utils/circle-area";

@injectable()
export class DifferencesFinderService {

    private isPixelVisited: boolean[] = [];
    public getNumberOfDifferences(image: BMPImage): number {
        let differencesCount: number = 0;
        this.isPixelVisited = new Array(image.size()).fill(false);

        this.isPixelVisited.forEach((isCurrentPixelVisited: boolean, index: number) => {
            if (!isCurrentPixelVisited && image.pixelAt(index).equals(Pixel.BLACK_PIXEL)) {
                this.explorePixels(index);
                differencesCount++;
            }
        });

        return differencesCount;
    }

    private explorePixels(index: number): void {
        this.isPixelVisited[index] = true;
    }
}
