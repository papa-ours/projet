import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";
import { DifferenceImage } from "./utils/difference-image";

@injectable()
export class DifferenceImageGenerator {

    private originalImage: BMPImage;
    private modifiedImage: BMPImage;

    public generate(originalImageData: Uint8Array, modifiedImageData: Uint8Array): DifferenceImage | undefined {
        if (BMPImage.isBMP(originalImageData) && BMPImage.isBMP(modifiedImageData)) {
            this.originalImage = BMPImage.fromArray(originalImageData);
            this.modifiedImage = BMPImage.fromArray(modifiedImageData);

            const bmpDifference: BMPImage = this.originalImage.compare(this.modifiedImage);
            const differenceImage: DifferenceImage = DifferenceImage.fromBMPImage(bmpDifference);

            differenceImage.augmentBlackPixels();

            return differenceImage;
        } else {
            return undefined;
        }
    }
}
