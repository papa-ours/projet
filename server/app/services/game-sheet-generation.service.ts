import { inject, injectable } from "inversify";
import { DBConnectionService } from "./dbconnection.service";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";

import "reflect-metadata";
import { GameSheetDescription, TopScore } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";
import Types from "../types";
import { BMPImage } from "./utils/bmp-image";

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
        const topScores: TopScore[] = [...Array(TOP_SCORES_LENGTH)].map(() => this.generateTopScore());

        const gameSheet: GameSheetDescription = {
            name: name,
            preview: originalImageData.toString(),
            topScores: topScores,
        };

        this.saveGameSheet(gameSheet);
    }

    public generateTopScore(): TopScore {
        return { solo: this.makeScore(), pvp: this.makeScore() };
    }

    private makeScore(): string {
        return this.makeUsername() + " " + this.makeTime();
    }

    private makeTime(): string {
        return this.makeMinutes() + ":" + this.makeSeconds();
    }

    private makeMinutes(): number {
        const MIN: number = 8;
        const MAX: number = 15;

        return this.getNumberBetween(MIN, MAX);
    }

    private makeSeconds(): number {
        const MIN: number = 0;
        const MAX: number = 59;

        return this.getNumberBetween(MIN, MAX);
    }

    public makeUsername(): string {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const MIN_LENGTH: number = 3;
        const MAX_LENGTH: number = 12;
        const usernameLength: number = this.getNumberBetween(MIN_LENGTH, MAX_LENGTH);
        const username: string[] = [...Array(usernameLength)].map(() => {
            const index: number = this.getNumberBetween(0, POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        return username.join("");
    }

    public getNumberBetween(min: number, max: number): number {
        if (min > max) {
            // If min is greater than max, we switch them
            const temp: number = max;
            max = min;
            min = temp;
        }

        return Math.floor(Math.random() * (max - min)) + min;
    }

    public saveGameSheet(gameSheetDescription: GameSheetDescription): void {
        this.dbConnection.connect()
            .then(() => {
                this.dbConnection.saveGameSheet2D(gameSheetDescription);
            });
    }
}
