import { inject, injectable } from "inversify";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";

import "reflect-metadata";
import Types from "../types";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class GameSheetGenerationService {
    public constructor(@inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
                       @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService) {}

    public generateGameSheet(name: string, originalImageData: Uint8Array, modifiedImageData: Uint8Array): string {
        const differenceImage: BMPImage = this.differenceImageGenerator.generate(originalImageData, modifiedImageData) as BMPImage;
        this.differencesFinder.getNumberOfDifferences(differenceImage);

        return differenceImage.toArray().toString();
    }
}
