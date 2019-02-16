import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { ImageType } from "../../../common/images/image-type";
import { FileReaderUtil } from "./utils/file-reader.util";

@injectable()
export class DifferenceImageGenerator {

    private imagesData: Uint8Array[] = [];

    public async generateDifferenceImage(name: string, paths: string[]): Promise<DifferenceImage | undefined> {
        const readFiles: Promise<Buffer>[] = paths.map((path: string) => {
            return FileReaderUtil.readFile(path);
        });

        return Promise.all(readFiles).then((buffers: Buffer[]) => {
            this.imagesData = buffers.map((buffer: Buffer) => {
                return new Uint8Array(buffer);
            });

            return this.generate();
        });
    }

    public generate(): DifferenceImage {
        if (!BMPImage.isBMP(this.imagesData[ImageType.Original])) {
            throw new TypeError("L'image originale n'est pas de type BMP");
        }

        if (!BMPImage.isBMP(this.imagesData[ImageType.Modified])) {
            throw new TypeError("L'image modifiée n'est pas de type BMP");
        }

        const originalImage: BMPImage = BMPImage.fromArray(this.imagesData[ImageType.Original]);
        const modifiedImage: BMPImage = BMPImage.fromArray(this.imagesData[ImageType.Modified]);

        const bmpDifference: BMPImage = originalImage.compare(modifiedImage);
        const differenceImage: DifferenceImage = DifferenceImage.fromBMPImage(bmpDifference);

        differenceImage.augmentBlackPixels();

        return differenceImage;
    }
}
