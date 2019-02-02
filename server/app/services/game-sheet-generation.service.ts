import { inject, injectable } from "inversify";
import { DBConnectionService } from "./dbconnection.service";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";

import "reflect-metadata";
import { GameSheetDescription, TopScore } from "../../../common/communication/game-description";
import Types from "../types";
import { BMPImage } from "./utils/bmp-image";
import { Message } from "../../../common/communication/message";

@injectable()
export class GameSheetGenerationService {
    public constructor(@inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
                       @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService,
                       @inject(Types.DBConnectionService) private dbConnection: DBConnectionService) {}

    public generateGameSheet(name: string, originalImageData: Uint8Array, modifiedImageData: Uint8Array): Message {
        const differenceImage: BMPImage = this.differenceImageGenerator.generate(originalImageData, modifiedImageData) as BMPImage;

        const numberOfDifferences: number = this.differencesFinder.getNumberOfDifferences(differenceImage);
        const REQUIRED_DIFFERENCES: number = 7;

        const message: Message = {
            title: "GameSheet Generation",
            body: "",
        };

        if (numberOfDifferences !== REQUIRED_DIFFERENCES) {
            message.body = "Les images n'ont pas exactement 7 différences, la création a été annulée";
        } else {
            this.createGameSheet(name, originalImageData);
        }

        return message;
    }

    private createGameSheet(name: string, originalImageData: Uint8Array): void {
        const TOP_SCORES_LENGTH: number = 3;
        const topScores: TopScore[] = new Array(TOP_SCORES_LENGTH).map(() => this.generateTopScore());

        const gameSheet: GameSheetDescription = {
            name: name,
            preview: originalImageData.toString(),
            topScores: topScores,
        };

        this.saveGameSheet(gameSheet);
    }

    public generateTopScore(): TopScore {
        return { solo: "", pvp: "" };
    }

    public saveGameSheet(gameSheetDescription: GameSheetDescription): void {
        this.dbConnection.connect()
            .then(() => {
                // this.dbConnection.saveGameSheet2D(gameSheetDescription);
            })
            .catch((err: Error) => {
                console.error(err);
            });
    }
}
