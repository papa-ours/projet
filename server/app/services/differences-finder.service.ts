import { injectable } from "inversify";
import "reflect-metadata";
import { DifferenceImage } from "./utils/difference-image";
import { Pixel } from "./utils/pixel";

@injectable()
export class DifferencesFinderService {

    private image: DifferenceImage;

    public getNumberOfDifferences(image: DifferenceImage): number {
        if (!image) {
            throw Error("Image must be defined");
        }
        this.image = image;

        for (let i: number = 0; i < this.image.size(); i++) {
            if (this.image.pixelAt(i).equals(Pixel.BLACK_PIXEL)) {
                this.image.getDifferenceAt(i);
            }
        }

        return this.image.differenceCount;
    }
}
