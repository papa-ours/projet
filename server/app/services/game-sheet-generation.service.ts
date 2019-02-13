import { inject, injectable } from "inversify";
import { DBConnectionService } from "./dbconnection.service";

import "reflect-metadata";
import { GameSheetDescription, GameSheet } from "../../../common/communication/game-description";
import { DifferenceImage } from "../../../common/images/difference-image";
import Types from "../types";
import { Game } from "./game";
import { GetGameService } from "./get-game.service";
import { TopScores } from "./score/top-scores";

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
        @inject(Types.DBConnectionService) private dbConnection: DBConnectionService,
        @inject(Types.GetGameService) private getGameService: GetGameService,
    ) {}

    public createGameSheet(name: string): void {
        const id: string = this.generateId();
        const gameSheet: GameSheet = {
            id: id,
            name: name,
            topScores: this.generateTopScores(),
        };
    }

    public createGame(name: string, differenceImage: DifferenceImage): void {
        const id: string = this.generateId();
        const game: Game = new Game(id, this.imagesData[ImageType.Original], this.imagesData[ImageType.Modified], differenceImage);
        const gameSheet: GameSheetDescription = {
            id: id,
            name: name,
            preview: this.imagesData[ImageType.Original].toString(),
            topScores: this.generateTopScores(),
        };
        this.getGameService.addGame(gameSheet, game);
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
