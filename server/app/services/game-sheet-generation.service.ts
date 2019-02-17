import { inject, injectable } from "inversify";
import { DBConnectionService } from "./dbconnection.service";
import { DifferenceImageGenerator } from "./difference-image-generator.service";
import { DifferencesFinderService } from "./differences-finder.service";

import "reflect-metadata";
import { GameSheetDescription } from "../../../common/communication/game-description";
import { Message, MessageType } from "../../../common/communication/message";
import Types from "../types";
import { Game } from "./game-sheet";
import { GetGameService } from "./get-game.service";
import { TopScores } from "./score/top-scores";
import { BMPImage } from "./utils/bmp-image";
import { FileReaderUtil } from "./utils/file-reader.util";

// @ts-ignore
enum ImageType {
    Original,
    Modified,
}

@injectable()
export class GameSheetGenerationService {
    // @ts-ignore
    private imagesData: Uint8Array[];

    public constructor(
        @inject(Types.DifferenceImageGenerator) private differenceImageGenerator: DifferenceImageGenerator,
        @inject(Types.DifferencesFinderService) private differencesFinder: DifferencesFinderService,
        @inject(Types.DBConnectionService) private dbConnection: DBConnectionService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
    ) {
        this.generateGameSheet("Voiture", ["assets/voiture-originalImage.bmp", "assets/voiture-modifiedImage.bmp"]);
        this.generateGameSheet("Pringles", ["assets/pringles-originalImage.bmp", "assets/pringles-modifiedImage.bmp"]);
    }

    public generateGameSheet(name: string, paths: string[]): void {
        const readFiles: Promise<Buffer>[] = paths.map((path: string) => {
            return FileReaderUtil.readFile(path);
        });

        Promise.all(readFiles).then((buffers: Buffer[]) => {
            this.imagesData = buffers.map((buffer: Buffer) => {
                return new Uint8Array(buffer);
            });
            this.filesAreRead(name);
        });
    }

    // @ts-ignore
    private filesAreRead(name: string): Message {
        const differenceImage: BMPImage = this.differenceImageGenerator
            .generate(this.imagesData[ImageType.Original], this.imagesData[ImageType.Modified]) as BMPImage;

        const numberOfDifferences: number = this.differencesFinder.getNumberOfDifferences(differenceImage);
        const REQUIRED_DIFFERENCES: number = 7;

        const message: Message = {
            type: MessageType.GAME_SHEET_GENERATION,
            body: "",
        };

        if (numberOfDifferences !== REQUIRED_DIFFERENCES) {
            message.body = "Les images n'ont pas exactement 7 différences, la création a été annulée";
        } else {
            this.createGame(name, differenceImage);
        }

        return message;
    }

    private createGame(name: string, differenceImage: BMPImage): void {
        const gameSheet: Game = new Game(   {
                                                id: this.generateId(),
                                                name: name,
                                                preview: this.imagesData[ImageType.Original].toString(),
                                                topScores: this.generateTopScores(),
                                            },
                                            this.imagesData[ImageType.Modified].toString(),
                                            differenceImage);
        this.getGameService.addGame(gameSheet);
    }

    private generateTopScores(): TopScores[] {
        const TOP_SCORES_LENGTH: number = 2;

        return [...Array(TOP_SCORES_LENGTH)].map(() => {

            return new TopScores();
        });
    }

    public saveGameSheet(gameSheetDescription: GameSheetDescription): void {
        this.dbConnection.connect()
            .then(() => {
                this.dbConnection.saveGameSheet2D(gameSheetDescription)
                    .catch((err: Error) => {
                        console.error(err);
                    });
            }).catch((err: Error) => {
                console.error(err);
            });
    }

    private generateId(): string {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const ID_LENGTH: number = 25;
        const id: string[] = [...Array(ID_LENGTH)].map(() => {
            const index: number = Math.floor(Math.random() * POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        return id.join("");
    }
}
