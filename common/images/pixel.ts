import { numberToLittleEndinanByteArray, readLittleEndianBytes } from "./binary";

export class Pixel {

    // tslint:disable-next-line:no-magic-numbers
    public static readonly WHITE_PIXEL: Pixel = new Pixel(0xFFFFFF);
    public static readonly BLACK_PIXEL: Pixel = new Pixel(0x000000);
    public static readonly BYTES_PER_PIXEL: number = 3;

    public constructor(private readonly rgb: number) {}

    public static readPixelColor(array: Uint8Array, index: number): Pixel {
        return new Pixel(readLittleEndianBytes(array, Pixel.BYTES_PER_PIXEL, index));
    }

    public toArray(): Uint8Array {
        return numberToLittleEndinanByteArray(this.rgb, Pixel.BYTES_PER_PIXEL);
    }

    public equals(other: Pixel): boolean {
        return this.rgb === other.rgb;
    }
}
