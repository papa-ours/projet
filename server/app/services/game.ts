import { BMPImage } from "./utils/bmp-image";
import { DifferenceImage } from "./utils/difference-image";
import { Pixel } from "./utils/pixel";

export class Game {
    public originalImage: BMPImage;
    public modifiedImage: BMPImage;
    public differenceImage: DifferenceImage;

    public constructor( public id: string,
                        originalImageData: Uint8Array,
                        modifiedImageData: Uint8Array,
                        differenceImage: DifferenceImage) {

                            this.differenceImage = DifferenceImage.fromBMPImage(differenceImage);
                            this.originalImage = BMPImage.fromArray(originalImageData);
                            this.modifiedImage = BMPImage.fromArray(modifiedImageData);

                        }

    public restoreModifiedImage(x: number, y: number): void {
        const index: number = this.differenceImage.getIndex({ i: x, j: y });
        const difference: number[] = this.differenceImage.getDifferenceAt(index);

        difference.forEach((differenceIndex: number) => {
            this.modifiedImage.setPixelAt(differenceIndex, this.originalImage.pixelAt(differenceIndex));
            this.differenceImage.setPixelAt(differenceIndex, Pixel.WHITE_PIXEL);
        });
    }
}
