import { HasId } from "../../../common/communication/game-description";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { ImageType } from "../../../common/images/image-type";
import { Pixel } from "../../../common/images/pixel";
import { FileReaderUtil } from "./utils/file-reader.util";
import { FileWriterUtil } from "./utils/file-writer.util";

export class Game implements HasId {
    public images: BMPImage[] = [];
    public differenceImage: DifferenceImage;
    public constructor(public id: string, name: string) {
        this.setupImages(name);
    }

    private setupImages(name: string): void {
        const imageTypes: string[] = ["original", "modified", "difference"];
        imageTypes.forEach(async (type: string, index: number) => {
            const data: Uint8Array = await FileReaderUtil.readFile(`uploads/${name}-${type}Image.bmp`);
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
        return FileWriterUtil.writeFile(`uploads/${this.id}.bmp`, new Buffer(this.images[ImageType.Modified].toArray()));
    }
}
