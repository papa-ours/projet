import { injectable } from "inversify";
import "reflect-metadata";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class DifferencesFinderService {

    public getNumberOfDifferences(image: BMPImage): number {
        const differencesCount: number = 0;

        return differencesCount;
    }
}
