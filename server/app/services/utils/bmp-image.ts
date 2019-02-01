import { readLittleEndianBytes } from "./binary";
import { CHUNK_RELATIVE_POSITIONS, Position } from "./circle-area";
import { Pixel } from "./pixel";

export class BMPImage {

    public constructor(private pixels: Pixel[], private readonly header: Uint8Array, public width?: number) {}

    public static fromArray(array: Uint8Array): BMPImage {
        const dataIndexIndex: number = 10;
        const dataIndexLength: number = 4;
        const dataIndex: number = readLittleEndianBytes(array, dataIndexLength, dataIndexIndex);

        const pixels: Pixel[] = [];
        const image: BMPImage = new BMPImage(pixels, array.slice(0, dataIndex));

        let index: number  = 0;
        for (let i: number = dataIndex; i < array.length; i += Pixel.BYTES_PER_PIXEL) {
            pixels[index++] = Pixel.readPixelColor(array, i);
        }

        return image;
    }

    public isBMP(): boolean {
        const B_CODE: number = 66;
        const M_CODE: number = 77;

        return (this.header[0] === B_CODE && this.header[1] === M_CODE);
    }

    public compare(other: BMPImage): BMPImage {
        const image: BMPImage = new BMPImage(Array.from(this.pixels), this.header, this.width);
        image.pixels = this.pixels.map((pixel: Pixel, index: number) => {
            return pixel.equals(other.pixels[index]) ? Pixel.WHITE_PIXEL : Pixel.BLACK_PIXEL;
        });

        return image;
    }

    public toArray(): Uint8Array {
        const length: number = this.header.length + this.pixels.length * Pixel.BYTES_PER_PIXEL;
        const array: Uint8Array = new Uint8Array(length);
        array.set(this.header);

        const index: {val: number} = {val: this.header.length};
        this.pixels.forEach((pixel: Pixel) => {
            array.set(pixel.toArray(), index.val);
            index.val += Pixel.BYTES_PER_PIXEL;
        });

        return array;
    }

    public augmentBlackPixels(): void {
        if (!this.width) {
            throw Error("Image width must be known to augment pixels");
        } else {
            const pixelsBefore: Pixel[] = Array.from(this.pixels);
            pixelsBefore.forEach((pixel: Pixel, index: number) => {
                if (pixel.equals(Pixel.BLACK_PIXEL)) {
                    this.augmentPixel(pixel, index);
                }
            });
        }

    }

    private augmentPixel(pixel: Pixel, index: number): void {
        const centerPosition: Position = this.resolvePosition(index);

        CHUNK_RELATIVE_POSITIONS.forEach((position: Position) => {
            const pixelToPlacePosition: Position = {
                i: centerPosition.i + position.i,
                j: centerPosition.j + position.j,
            };

            const pixelToPlaceIndex: number = this.resolveIndex(pixelToPlacePosition);
            this.placePixel(pixelToPlaceIndex, Pixel.BLACK_PIXEL);
        });
    }

    private placePixel(index: number, pixel: Pixel): void {
        if (index >= 0 && index < this.pixels.length) {
            this.pixels[index] = pixel;
        }
    }

    private resolveIndex(position: Position): number {
        if (!this.width) {
            throw Error("Image width must be know to resolve index");
        }

        return (position.j * this.width + position.i);
    }

    private resolvePosition(index: number): Position {
        if (!this.width) {
            throw Error("Image width must be know to resolve position");
        }

        return {
            i: ( index % this.width ),
            j: Math.floor(index / this.width),
        };
    }
}
