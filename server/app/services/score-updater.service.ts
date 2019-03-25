import { inject, injectable } from "inversify";
import { GameMode, GameSheet } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { Score } from "./score/score";
import { TopScores } from "./score/top-scores";

@injectable()
export class ScoreUpdaterService {

    public constructor(@inject(Types.DBConnectionService) private dbConnectionService: DBConnectionService) {

    }

    public async putSoloScore(gameSheetId: string, name: string, time: number): Promise<GameSheet> {
        return this.dbConnectionService.putSoloScore(gameSheetId, name, time);
    }

    public getPosition(gameSheet: GameSheet, time: number): number {
        let position: number = -1;
        (gameSheet.topScores[GameMode.Solo] as TopScores).scores
            .map((score: Score) => score.time)
            .forEach((sheetTime: number, index: number) => {
                if (time < sheetTime) {
                    position = index;
                }
            });

        return position;
    }
}
