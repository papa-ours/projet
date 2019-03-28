import { inject, injectable } from "inversify";
import { GameMode, GameSheet } from "../../../common/communication/game-description";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { Score } from "./score/score";
import { TopScores } from "./score/top-scores";
import { reverse } from "dns";

@injectable()
export class ScoreUpdaterService {

    public constructor(@inject(Types.DBConnectionService) private dbConnectionService: DBConnectionService) {

    }

    public async putScore(gameSheetId: string, name: string, time: number, mode: GameMode): Promise<GameSheet> {
        return this.dbConnectionService.putScore(gameSheetId, name, time, mode);
    }

    public getPosition(gameSheet: GameSheet, time: number, mode: GameMode): number {
        let position: number = -1;
        (gameSheet.topScores[mode] as TopScores).scores
            .map((score: Score) => score.time)
            .reverse()
            .forEach((sheetTime: number, index: number) => {
                if (time < sheetTime) {
                    position = index;
                }
            });

        return position;
    }
}
