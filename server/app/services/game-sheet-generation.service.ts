import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, GameType } from "../../../common/communication/game-description";
import Types from "../types";
import { GetGameService } from "./get-game.service";
import { TopScores } from "./score/top-scores";

@injectable()
export class GameSheetGenerationService {

    public constructor(@inject(Types.GetGameService) private getGameService: GetGameService) {}

    public createGameSheet(name: string, type: GameType): void {
        const gameSheet: GameSheet = {
            id: "",
            name: name,
            topScores: this.generateTopScores(),
        };
        this.getGameService.addGameSheet(gameSheet, type);
    }

    private generateTopScores(): TopScores[] {
        const TOP_SCORES_LENGTH: number = 2;

        return [...Array(TOP_SCORES_LENGTH)].map(() => {

            return new TopScores();
        });
    }
}
