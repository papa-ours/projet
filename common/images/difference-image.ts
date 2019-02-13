import { readLittleEndianBytes } from "./binary";
import { BMPImage } from "./bmp-image";
import { Position } from "./position";
import { Pixel } from "./pixel";

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

    public static fromArray(array: Uint8Array, width: number = BMPImage.WIDTH, height: number = BMPImage.HEIGHT): DifferenceImage {
        const dataIndexIndex: number = 10;
        const dataIndexLength: number = 4;
        const dataIndex: number = readLittleEndianBytes(array, dataIndexLength, dataIndexIndex);

        const pixels: Pixel[] = new Array<Pixel>(width * height);
        const image: DifferenceImage = new DifferenceImage(pixels, array.slice(0, dataIndex), width, height);

        let index: number  = 0;
        for (let i: number = dataIndex; index < pixels.length; i += Pixel.BYTES_PER_PIXEL) {
            pixels[index++] = Pixel.readPixelColor(array, i);
        }

        return image;
    }

    public static fromString(data: string): DifferenceImage {
        const numberData: number[] = data.split(",").map(Number);
        const array: Uint8Array = new Uint8Array(numberData);

        return DifferenceImage.fromArray(array);
    }

    public getDifferenceAt(index: number): number[] {
        const difference: number[] = [];
        const stack: number[] = [];
        if (!this.isPixelVisited[index]) {

            if (this.pixelAt(index).equals(Pixel.BLACK_PIXEL)) {
                stack.push(index);
                difference.push(index);
                while (stack.length > 0) {
                    this.explorePixel(stack.pop() as number, stack, difference);
                }
                this.differenceCount++;
            } else {
                this.isPixelVisited[index] = true;
            }

        }

        return difference;
    }

    private explorePixel(index: number, pixelsToVisit: number[], difference: number[]): void {
        this.isPixelVisited[index] = true;
        const currentPosition: Position = this.getPosition(index);
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    const pixelToVisitPosition: Position = {
                        i: currentPosition.i + i,
                        j: currentPosition.j + j,
                    };
                    const pixelToVisitIndex: number = this.getIndex(pixelToVisitPosition);

                    if (pixelToVisitIndex >= 0 && pixelToVisitIndex < this.isPixelVisited.length) {
                        if (this.pixelAt(pixelToVisitIndex).equals(Pixel.BLACK_PIXEL) && !this.isPixelVisited[pixelToVisitIndex]) {
                            if (!pixelsToVisit.find((val: number) => val === pixelToVisitIndex)) {
                                difference.push(pixelToVisitIndex);
                                pixelsToVisit.push(pixelToVisitIndex);
                            }
                        }
                    }
                }
            }
        }
    }
}
