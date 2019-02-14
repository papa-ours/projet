import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
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

    public generate(): DifferenceImage | undefined {
        if (BMPImage.isBMP(this.imagesData[0]) && BMPImage.isBMP(this.imagesData[1])) {
            const originalImage: BMPImage = BMPImage.fromArray(this.imagesData[0]);
            const modifiedImage: BMPImage = BMPImage.fromArray(this.imagesData[1]);

            const bmpDifference: BMPImage = originalImage.compare(modifiedImage);
            const differenceImage: DifferenceImage = DifferenceImage.fromBMPImage(bmpDifference);

            differenceImage.augmentBlackPixels();

            return differenceImage;
        } else {
            return undefined;
        }
    }
}
