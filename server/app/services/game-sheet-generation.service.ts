import { inject, injectable } from "inversify";

import "reflect-metadata";
import { GameSheet } from "../../../common/communication/game-description";
import Types from "../types";
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
        @inject(Types.GetGameService) private getGameService: GetGameService,
    ) {}

    public createGameSheet(name: string): void {
        const gameSheet: GameSheet = {
            id: "",
            name: name,
            topScores: this.generateTopScores(),
        };
        this.getGameService.addGameSheet(gameSheet);
    }

    private generateTopScores(): TopScores[] {
        const TOP_SCORES_LENGTH: number = 2;

        return [...Array(TOP_SCORES_LENGTH)].map(() => {

            return new TopScores();
        });
    }
}
