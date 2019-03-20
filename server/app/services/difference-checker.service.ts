import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "../../../common/images/bmp-image";
import { Pixel } from "../../../common/images/pixel";
import { AbstractGame } from "./game/game";

@injectable()
export class DifferenceCheckerService {

    public isPositionDifference(x: number, y: number, game: AbstractGame): boolean {
        const differenceImage: BMPImage = game.differenceImage;

        return this.checkDifference(x, y, differenceImage);
    }

    private checkDifference(x: number, y: number, image: BMPImage): boolean {
        const index: number = image.getIndex({ i: x, j: y });
        const pixel: Pixel = image.pixelAt(index);

        return pixel ? pixel.equals(Pixel.BLACK_PIXEL) : false;
    }
}
