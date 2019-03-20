import { BMPImage } from "../../../../common/images/bmp-image";
import { DifferenceImage } from "../../../../common/images/difference-image";
import { ImageType } from "../../../../common/images/image-type";
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
}
