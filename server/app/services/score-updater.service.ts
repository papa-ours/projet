import { injectable } from "inversify";

@injectable()
export class ScoreUpdaterService {

    public async putScore(gameSheetId: string, name: string, time: number): Promise<{}> {
        return {};
    }
}
