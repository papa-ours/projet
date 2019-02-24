import { readLittleEndianBytes } from "./binary";
import { BMPImage } from "../images/bmp-image";
import { Position } from "./position";
import { Pixel } from "./pixel";
import { DepthFirstSearch } from "../utils/depth-first-search";

export class DifferenceImage extends BMPImage {
    private isPixelVisited: boolean[];
    public differenceCount: number = 0;

    public constructor(pixels: Pixel[], header: Uint8Array, width: number, height: number) {
        super(pixels, header, width, height);
        this.isPixelVisited = new Array(this.size()).fill(false);
    }

    public static fromBMPImage(bmp: BMPImage): DifferenceImage {
        return new DifferenceImage(Array.from(bmp.pixels), bmp.header, bmp.width, bmp.height);
    }

    public static fromArray(imageData: Uint8Array, width: number = BMPImage.WIDTH, height: number = BMPImage.HEIGHT): DifferenceImage {
        const dataIndexIndex: number = 10;
        const dataIndexLength: number = 4;
        const dataIndex: number = readLittleEndianBytes(imageData, dataIndexLength, dataIndexIndex);

        const pixels: Pixel[] = new Array<Pixel>(width * height);
        const image: DifferenceImage = new DifferenceImage(pixels, imageData.slice(0, dataIndex), width, height);

        let index: number  = 0;
        for (let i: number = dataIndex; index < pixels.length; i += Pixel.BYTES_PER_PIXEL) {
            pixels[index++] = Pixel.readPixelColor(imageData, i);
        }

        return image;
    }

    public getDifferenceAt(index: number): number[] {

        const image: DifferenceImage = this;

        if (!this.isPixelVisited[index]) {
            if (this.pixelAt(index).equals(Pixel.BLACK_PIXEL)) {
                this.differenceCount++;
                return DepthFirstSearch.search(index,
                    (current: number) => {
                        return image.getNeighbors(current)
                            .filter((index: number) => image.isIndexValid(index) && image.pixelAt(index).equals(Pixel.BLACK_PIXEL)
                        );
                    }
                );
            }
        }

        return [];
    }

    private getNeighbors(index: number): number[] {
        this.isPixelVisited[index] = true;
        const currentPosition: Position = this.getPosition(index);

        const neighbors: number[] = [];

        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    const pixelToVisitPosition: Position = {
                        i: currentPosition.i + i,
                        j: currentPosition.j + j,
                    };
                    neighbors.push(this.getIndex(pixelToVisitPosition));
                }
            }
        }
        return neighbors;
    }

    private isIndexValid(index: number): boolean {
        return index >= 0 && index < this.isPixelVisited.length;
    }
}
