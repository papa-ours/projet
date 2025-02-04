import { readLittleEndianBytes } from "./binary";
import { Position } from "./position";
import { BMP_IMAGE_HEIGHT, BMP_IMAGE_WIDTH } from "../communication/constants";
import { CHUNK_RELATIVE_POSITIONS } from "../../server/app/services/utils/circle-area";
import { Pixel } from "./pixel";

export class BMPImage {

    public constructor(
        public pixels: Pixel[],
        public readonly header: Uint8Array,
        public readonly width: number,
        public readonly height: number,
    ) {}

    public static fromArray(imageData: Uint8Array, width: number = BMP_IMAGE_WIDTH, height: number = BMP_IMAGE_HEIGHT): BMPImage {
        const dataIndexIndex: number = 10;
        const dataIndexLength: number = 4;
        const dataIndex: number = readLittleEndianBytes(imageData, dataIndexLength, dataIndexIndex);

        const pixels: Pixel[] = new Array<Pixel>(width * height);
        const image: BMPImage = new BMPImage(pixels, imageData.slice(0, dataIndex), width, height);

        let index: number  = 0;
        for (let i: number = dataIndex; index < pixels.length; i += Pixel.BYTES_PER_PIXEL) {
            pixels[index++] = Pixel.readPixelColor(imageData, i);
        }

        return image;
    }

    public encode(): string {
        const numberData: number[] = Array.from(this.toArray());
        const encodedString: string[] = numberData.map(Number).map((val: number) => String.fromCharCode(val));
        const bmpDataPrefix: string = "data:image/bmp;base64,";
        
        return bmpDataPrefix + btoa(encodedString.join(""));
    }

    public static isBMP(imageData: Uint8Array): boolean {
        const B_CODE: number = "B".charCodeAt(0);
        const M_CODE: number = "M".charCodeAt(0);

        return (imageData[0] === B_CODE && imageData[1] === M_CODE);
    }

    public static isBitFormatValid(imageData: Uint8Array): boolean {
        const BIT_FORMAT_OFFSET: number = 28;
        const BIT_FORMAT: number = 24;

        return (imageData[BIT_FORMAT_OFFSET] === BIT_FORMAT);
    }

    public static isDimensionValid(imageData: Uint8Array): boolean {
        const WIDTH_OFFSET: number = 18;
        const HEIGHT_OFFSET: number = 22;
        const WIDTH_CODE: number = 128
        const HEIGTH_CODE: number = 224;

        return (imageData[WIDTH_OFFSET] === WIDTH_CODE && imageData[HEIGHT_OFFSET] === HEIGTH_CODE);
    }

    public compare(other: BMPImage): BMPImage {
        const image: BMPImage = new BMPImage(Array.from(this.pixels), this.header, this.width, this.height);
        image.pixels = this.pixels.map((pixel: Pixel, index: number) => {
            return pixel.equals(other.pixels[index]) ? Pixel.WHITE_PIXEL : Pixel.BLACK_PIXEL;
        });

        return image;
    }

    public toArray(): Uint8Array {
        const length: number = this.header.length + this.pixels.length * Pixel.BYTES_PER_PIXEL;
        const imageData: Uint8Array = new Uint8Array(length);
        imageData.set(this.header);

        const index: {val: number} = {val: this.header.length};
        this.pixels.forEach((pixel: Pixel) => {
            imageData.set(pixel.toArray(), index.val);
            index.val += Pixel.BYTES_PER_PIXEL;
        });

        return imageData;
    }

    public size(): number {
        return this.pixels.length;
    }

    public pixelAt(index: number): Pixel {
        return this.pixels[index];
    }

    public augmentBlackPixels(): void {
        const pixelsBefore: Pixel[] = Array.from(this.pixels);
        pixelsBefore.forEach((pixel: Pixel, index: number) => {
            if (pixel.equals(Pixel.BLACK_PIXEL)) {
                this.augmentPixel(pixel, index);
            }
        });
    }

    private augmentPixel(pixel: Pixel, index: number): void {
        const centerPosition: Position = this.getPosition(index);

        CHUNK_RELATIVE_POSITIONS.forEach((position: Position) => {
            const pixelToPlacePosition: Position = {
                i: centerPosition.i + position.i,
                j: centerPosition.j + position.j,
            };

            const pixelToPlaceIndex: number = this.getIndex(pixelToPlacePosition);
            this.placePixel(pixelToPlaceIndex, Pixel.BLACK_PIXEL);
        });
    }

    public placePixel(index: number, pixel: Pixel): void {
        if (index >= 0 && index < this.pixels.length) {
            this.pixels[index] = pixel;
        }
    }

    public getIndex(position: Position): number {
        return (position.j * this.width + position.i);
    }

    public getPosition(index: number): Position {
        return {
            i: (index % this.width),
            j: Math.floor(index / this.width),
        };
    }
}
