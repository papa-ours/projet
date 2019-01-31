import { readLittleEndianBytes } from "./binary";
import { Pixel } from "./pixel";

export class BMPImage {

    public constructor(private pixels: Pixel[], private readonly header: Uint8Array) {}

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

    public compare(other: BMPImage): BMPImage {
        const image: BMPImage = new BMPImage(Array.from(this.pixels), this.header);
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
}
