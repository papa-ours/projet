import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { ImageType } from "../../../common/images/image-type";
import { FileReaderUtil } from "./utils/file-reader.util";

@injectable()
export class DifferenceImageGenerator {

    private imagesData: [Uint8Array, Uint8Array] = [new Uint8Array([]), new Uint8Array([])];

    public async generateDifferenceImage(name: string, paths: string[]): Promise<DifferenceImage> {
        const readFiles: Promise<Buffer>[] = paths.map((path: string) => {
            return FileReaderUtil.readFile(path);
        });

        return Promise.all(readFiles).then((buffers: Buffer[]) => {
            buffers.forEach((buffer: Buffer, index: number) => {
                this.imagesData[index] = new Uint8Array(buffer);
            });

            return this.generate();
        });
    }

    public generate(): DifferenceImage {
        this.imagesValidation();
        const originalImage: BMPImage = BMPImage.fromArray(this.imagesData[ImageType.Original]);
        const modifiedImage: BMPImage = BMPImage.fromArray(this.imagesData[ImageType.Modified]);

        const bmpDifference: BMPImage = originalImage.compare(modifiedImage);
        const differenceImage: DifferenceImage = DifferenceImage.fromBMPImage(bmpDifference);

        differenceImage.augmentBlackPixels();

        return differenceImage;
    }
    private imagesValidation(): void {
        this.imagesBMPValidation();
        this.imagesDimensionValidation();
        this.bitFormatValidation();
    }

    private imagesBMPValidation(): void {
        if (!BMPImage.isBMP(this.imagesData[ImageType.Original])) {
            throw new TypeError("L'image originale n'est pas de type BMP");
        }

        if (!BMPImage.isBMP(this.imagesData[ImageType.Modified])) {
            throw new TypeError("L'image modifiée n'est pas de type BMP");
        }
    }

    private imagesDimensionValidation(): void {
        if (!BMPImage.isDimensionValid(this.imagesData[ImageType.Original])) {
            throw new SyntaxError("L'image originale n'est pas de dimension 640px x 480px");
        }

        if (!BMPImage.isDimensionValid(this.imagesData[ImageType.Modified])) {
            throw new SyntaxError("L'image modifiée n'est pas de dimension 640px x 480px");
        }
    }

    private bitFormatValidation(): void {
        if (!BMPImage.isBitFormatValid(this.imagesData[ImageType.Original])) {
            throw new SyntaxError("L'image originale n'est pas en format 24 bit");
        }

        if (!BMPImage.isBitFormatValid(this.imagesData[ImageType.Modified])) {
            throw new SyntaxError("L'image modifiée n'est pas en format 24 bit");
        }
    }
}
