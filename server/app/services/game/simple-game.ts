import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { ImageType } from "../../../../common/images/image-type";
import { Pixel } from "../../../../common/images/pixel";
import { FileIO } from "../utils/file-io.util";
import { AbstractGame } from "./game";

export class SimpleGame extends AbstractGame {

    protected setUp(name: string): void {
        const imageTypes: string[] = ["original", "modified", "difference"];
        imageTypes.forEach(async (type: string, index: number) => {
            const data: Uint8Array = await FileIO.readFile(`uploads/${name}-${type}Image.bmp`);
            if (index === ImageType.Difference) {
                this.differenceImage = DifferenceImage.fromArray(data);
            } else {
                this.images[index] = BMPImage.fromArray(data);
            }
        });
    }

    public async restoreModifiedImage(x: number, y: number): Promise<{}> {
        const index: number = this.differenceImage.getIndex({ i: x, j: y });
        const difference: number[] = this.differenceImage.getDifferenceAt(index);

        difference.forEach((differenceIndex: number) => {
            this.images[ImageType.Modified].placePixel(differenceIndex, this.images[ImageType.Original].pixelAt(differenceIndex));
            this.differenceImage.placePixel(differenceIndex, Pixel.WHITE_PIXEL);
        });

        return this.saveModifiedImage();
    }

    private async saveModifiedImage(): Promise<{}> {
        return FileIO.writeFile(`uploads/${this.id}.bmp`, Buffer.from(this.images[ImageType.Modified].toArray()));
    }
}
