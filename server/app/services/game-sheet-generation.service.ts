import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { GetGameService } from "./get-game.service";
import { TopScores } from "./score/top-scores";

@injectable()
export class GameSheetGenerationService {

    public constructor(
        @inject(Types.GetGameService) private getGameService: GetGameService) {}

    public createGameSheet(name: string, type: GameType, saveGameSheet: boolean = true): GameSheet {
        const gameSheet: GameSheet = {
            id: "",
            name: name,
            topScores: this.generateTopScores(),
        };

        if (saveGameSheet) {
            this.saveGameSheet(gameSheet, type);
        }

        return gameSheet;
    }

    private saveGameSheet(gameSheet: GameSheet, type: GameType): void {
        this.getGameService.addGameSheet(gameSheet, type);
        DBConnectionService.getInstance().saveGameSheet(gameSheet, type)
            .catch((error: Error) => console.error(error.message));
    }

    private generateTopScores(): TopScores[] {
        const TOP_SCORES_LENGTH: number = 2;

        return [...Array(TOP_SCORES_LENGTH)].map(() => {

            return new TopScores();
        });
    }
}
