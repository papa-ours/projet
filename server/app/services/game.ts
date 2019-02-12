import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { Pixel } from "../../../common/images/pixel";

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
            this.modifiedImage.placePixel(differenceIndex, this.originalImage.pixelAt(differenceIndex));
            this.differenceImage.placePixel(differenceIndex, Pixel.WHITE_PIXEL);
        });
    }
}
