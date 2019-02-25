import { REQUIRED_DIFFERENCES_1P } from "../../../common/communication/constants";
import { GameType, HasId } from "../../../common/communication/game-description";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { ImageType } from "../../../common/images/image-type";
import { Pixel } from "../../../common/images/pixel";
import { FileDeleterUtil } from "./utils/file-deleter-util";
import { FileReaderUtil } from "./utils/file-reader.util";
import { FileWriterUtil } from "./utils/file-writer.util";

export class Game implements HasId {
    public differenceCount: number;
    public images: BMPImage[];
    public differenceImage: DifferenceImage;

    public constructor(public id: string, name: string, public type: GameType) {
        this.images = [];
        this.setupImages(name);
        this.differenceCount = REQUIRED_DIFFERENCES_1P;
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

        this.differenceCount--;
        if (this.differenceCount === 0) {
            return this.deleteModifiedImage();
        } else {
            return this.saveModifiedImage();
        }

    }

    private async saveModifiedImage(): Promise<{}> {
        return FileWriterUtil.writeFile(`uploads/${this.id}.bmp`, Buffer.from(this.images[ImageType.Modified].toArray()));
    }

    public async deleteModifiedImage(): Promise<{}> {
        return FileDeleterUtil.deleteFile(`uploads/${this.id}.bmp`);
    }
}
