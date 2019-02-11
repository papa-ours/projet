import { BMPImage } from "./bmp-image";
import { Pixel } from "./pixel";

export class DifferenceImage extends BMPImage {
    public constructor(pixels: Pixel[], header: Uint8Array, width: number, height: number) {
        super(pixels, header, width, height);
    }
}
