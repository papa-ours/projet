import { inject, injectable } from "inversify";
import { DBConnectionService } from "./dbconnection.service";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";

import "reflect-metadata";
import { GameSheetDescription } from "../../../common/communication/game-description";
import Types from "../types";
import { BMPImage } from "./utils/bmp-image";

@injectable()
export class GameSheetGenerationService {
    public constructor(@inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
                       @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService,
                       @inject(Types.DBConnectionService) private dbConnection: DBConnectionService) {}

    public generateGameSheet(name: string, originalImageData: Uint8Array, modifiedImageData: Uint8Array): void {
        const differenceImage: BMPImage = this.differenceImageGenerator.generate(originalImageData, modifiedImageData) as BMPImage;
        this.differencesFinder.getNumberOfDifferences(differenceImage);

        this.saveGameSheet({
            name: name,
            preview: originalImageData.toString(),
            topScores: [
                { solo: "4:20 Vincent", pvp: "9:99 Vincent" },
                { solo: "4:20 Vincent", pvp: "9:99 Vincent" },
                { solo: "4:20 Vincent", pvp: "9:99 Vincent" },
            ],
        });
    }

    public saveGameSheet(gameSheetDescription: GameSheetDescription): void {
        this.dbConnection.connect()
            .then(() => {
                this.dbConnection.saveGameSheet2D(gameSheetDescription);
            })
            .catch((err: Error) => {
                console.error(err);
            });
    }
}
