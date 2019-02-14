import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { Pixel } from "../../../common/images/pixel";
import { FileReaderUtil } from "./utils/file-reader.util";
import { FileWriterUtil } from "./utils/file-writer.util";

export class Game {
    public images: BMPImage[] = [];
    public differenceImage: DifferenceImage;
    public constructor( public id: string, name: string) {
        this.setupImages(name);
    }

    private setupImages(name: string): void {
        const imageTypes: string[] = [ "original", "modified", "difference" ];
        imageTypes.forEach(async (type: string, index: number) => {
            const data: Uint8Array = await FileReaderUtil.readFile(`uploads/${name}-${type}Image.bmp`);
            if (index === 2) {
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
            this.images[1].setPixelAt(differenceIndex, this.images[0].pixelAt(differenceIndex));
            this.differenceImage.setPixelAt(differenceIndex, Pixel.WHITE_PIXEL);
        });

        return this.saveModifiedImage();
    }

    private async saveModifiedImage(): Promise<{}> {
        return FileWriterUtil.writeFile(`uploads/${this.id}.bmp`, this.images[1].toArray());
    }
}
