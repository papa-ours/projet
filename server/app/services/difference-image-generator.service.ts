import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class DifferenceImageGenerator {

    private originalImage: BMPImage;
    private modifiedImage: BMPImage;

    public generate(originalImageData: Uint8Array, modifiedImageData: Uint8Array): BMPImage | undefined {
        if (BMPImage.isBMP(originalImageData) && BMPImage.isBMP(modifiedImageData)) {
            this.originalImage = BMPImage.fromArray(originalImageData);
            this.modifiedImage = BMPImage.fromArray(modifiedImageData);

            const differenceImage: BMPImage = this.originalImage.compare(this.modifiedImage);

            differenceImage.augmentBlackPixels();

            return differenceImage;
        } else {
            return undefined;
        }
    }
}
