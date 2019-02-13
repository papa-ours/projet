import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { Pixel } from "../../../../common/images/pixel";

export class Game {
    public originalImage: BMPImage;
    public modifiedImage: BMPImage;
    public differenceImage: DifferenceImage;

    public constructor( imagesData: string[]) {

                            this.originalImage = BMPImage.fromString(imagesData[0]);
                            this.modifiedImage = BMPImage.fromString(imagesData[1]);
                            this.differenceImage = DifferenceImage.fromString(imagesData[2]);

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
