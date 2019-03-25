import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameMode, GameSheet, GameType } from "../../../common/communication/game-description";
import { Score } from "./score/score";
import { TopScores } from "./score/top-scores";

interface DeleteResponse {
    ok?: number;
    n?: number;
}

@injectable()
export class DBConnectionService {
    private readonly uri: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";
    public readonly gameSheetSchema: mongoose.Schema = new mongoose.Schema({
        name: String,
        id: String,
        topScoresSolo: Array,
        topScores1v1: Array,
        type: Number,
    });
    public connected: boolean = false;

    public constructor() {
        if (!mongoose.models.GameSheet) {
            mongoose.model("GameSheet", this.gameSheetSchema);
            mongoose.set("useFindAndModify", false);
        }
    }

    public async connect(): Promise<typeof mongoose> {
        return mongoose.connect(this.uri, {
            useNewUrlParser: true,
        });
    }

    public async closeConnection(): Promise<void> {
        return mongoose.disconnect()
        .catch((error: Error) => console.error(error.message));
    }

    private parseGameSheetDocument(doc: mongoose.Document): GameSheet {
        const gameSheet: GameSheet & {topScoresSolo: Score[], topScores1v1: Score[]} = doc.toObject();
        gameSheet.topScores = [
            new TopScores(gameSheet.topScoresSolo),
            new TopScores(gameSheet.topScores1v1),
        ];

        return gameSheet;
    }

    public async saveGameSheet(gameSheet: GameSheet, type: GameType): Promise<mongoose.Document> {
        const gameSheetDocument: mongoose.Document = new mongoose.models.GameSheet({
            name: gameSheet.name,
            id: gameSheet.id,
            topScoresSolo: (gameSheet.topScores[0] as TopScores).scores,
            topScores1v1: (gameSheet.topScores[1] as TopScores).scores,
            type: type,
        });

        return gameSheetDocument.save();
    }

    public async getGameSheets(type: GameType): Promise<GameSheet[]> {
        const documents: mongoose.Document[] = await mongoose.models.GameSheet.find({type: type}).exec();

        return documents.map((document: mongoose.Document) => this.parseGameSheetDocument(document));
    }

    public async reinitializeScores(id: string, type: GameType): Promise<{}> {
        const TOP_SCORES_LENGTH: number = 2;
        const topScores: TopScores[] = [...Array(TOP_SCORES_LENGTH)].map(() => TopScores.generateTopScores());

        return mongoose.models.GameSheet.updateOne({id: id, type: type}, {topScores: topScores}).exec();
    }

    public async deleteGameSheet(id: string, type: GameType): Promise<DeleteResponse> {
        return mongoose.models.GameSheet.deleteOne({id: id, type: type});
    }

    public async getGameSheetId(name: string, type: GameType): Promise<string> {
        const instance: typeof mongoose = await this.connect();

        return instance.models.GameSheet.findOne(
            {name: name, type: type},
        ).exec()
        .then(async (gameSheet: GameSheet) => instance.disconnect().then(() => gameSheet.id));
    }

    public async putSoloScoreAndGetPosition(gameSheetId: string, username: string, time: number): Promise<number> {
        const now: Date = new Date();
        const instance: typeof mongoose = await this.connect();
        let position: number = -1;

        return instance.models.GameSheet.findOneAndUpdate(
            {id: gameSheetId},
            {
                $push: {
                    topScoresSolo: {
                        $each: [{username, time, date: now}],
                        $sort: {time: 1},
                        $slice: TopScores.SCORE_LENGTH,
                    },
                },
            },
        ).exec().then(async (doc: mongoose.Document) => {
            const gameSheet: GameSheet = this.parseGameSheetDocument(doc);
            (gameSheet.topScores[GameMode.Solo] as TopScores).scores
                .map((score: Score) => score.time)
                .forEach((sheetTime: number, index: number) => {
                    if (time < sheetTime && position === -1) {
                        position = index;
                    }
                });

            return instance.disconnect();
        }).then(() => position);
    }
}
