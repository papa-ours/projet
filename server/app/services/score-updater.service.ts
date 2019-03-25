import { inject, injectable } from "inversify";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";

@injectable()
export class ScoreUpdaterService {

    public constructor(@inject(Types.DBConnectionService) private dbConnectionService: DBConnectionService) {

    }

    public async putScore(gameSheetId: string, name: string, time: number): Promise<void> {

        return this.dbConnectionService.putSoloScore(gameSheetId, name, time);
    }
}
