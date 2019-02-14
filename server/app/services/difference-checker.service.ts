import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { DifferenceImage } from "../../../common/images/difference-image";
import { Pixel } from "../../../common/images/pixel";
import { FileReaderUtil } from "./utils/file-reader.util";

@injectable()
export class DifferenceCheckerService {
    public async isPositionDifference(x: number, y: number, name: string): Promise<boolean> {
            const data: Uint8Array = await FileReaderUtil.readFile(`uploads/${name}-differenceImage.bmp`);
            const differenceImage: BMPImage = DifferenceImage.fromArray(data);

            return this.checkDifference(x, y, differenceImage);
    }

    private checkDifference(x: number, y: number, image: BMPImage): boolean {
        const index: number = image.getIndex({ i: x, j: y });
        const pixel: Pixel = image.pixelAt(index);

        return pixel ? pixel.equals(Pixel.BLACK_PIXEL) : false;
    }
}
