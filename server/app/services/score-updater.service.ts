import { inject, injectable } from "inversify";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";

@injectable()
export class ScoreUpdaterService {

    public constructor(@inject(Types.DBConnectionService) private dbConnectionService: DBConnectionService) {

    }

    public async putSoloScoreAndGetPosition(gameSheetId: string, name: string, time: number): Promise<number> {

        return this.dbConnectionService.putSoloScoreAndGetPosition(gameSheetId, name, time);
    }
}
