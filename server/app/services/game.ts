import { BMPImage } from "./utils/bmp-image";

export class Game {
    public originalImage: BMPImage;
    public modifiedImage: BMPImage;

    public constructor(public id: string, originalImageData: Uint8Array, modifiedImageData: Uint8Array, public differenceImage: BMPImage) {
        this.originalImage = BMPImage.fromArray(originalImageData);
        this.modifiedImage = BMPImage.fromArray(modifiedImageData);
    }
}
