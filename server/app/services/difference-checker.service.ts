import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { Pixel } from "../../../common/images/pixel";
import { Game } from "./game";

@injectable()
export class DifferenceCheckerService {
    public async isPositionDifference(x: number, y: number, game: Game): Promise<boolean> {
            const differenceImage: BMPImage = game.differenceImage;

            return this.checkDifference(x, y, differenceImage);
    }

    private checkDifference(x: number, y: number, image: BMPImage): boolean {
        const index: number = image.getIndex({ i: x, j: y });
        const pixel: Pixel = image.pixelAt(index);

        return pixel ? pixel.equals(Pixel.BLACK_PIXEL) : false;
    }
}
