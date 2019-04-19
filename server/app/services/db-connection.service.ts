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
    private static readonly URI: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";
    private readonly gameSheetSchema: mongoose.Schema = new mongoose.Schema({
        name: String,
        id: String,
        topScoresSolo: Array,
        topScores1v1: Array,
        type: Number,
    });

    public constructor() {
        if (!mongoose.models.GameSheet) {
            mongoose.model("GameSheet", this.gameSheetSchema);
            mongoose.set("useFindAndModify", false);
        }
    }

    private async performRequest<T>(request: (instance: typeof mongoose) => Promise<T>): Promise<T> {
        const instance: typeof mongoose = await this.connect();
        const t: T = await request(instance);

        return instance.disconnect().then(() => t);
    }

    public async connect(): Promise<typeof mongoose> {
        return mongoose.connect(DBConnectionService.URI, {
            useNewUrlParser: true,
        });
    }

    public async closeConnection(): Promise<void> {
        return mongoose.disconnect()
        .catch((error: Error) => console.error(error.message));
    }

    private parseGameSheetDocument(doc: mongoose.Document): GameSheet {
        const gameSheet: GameSheet & {topScoresSolo: Score[], topScores1v1: Score[]} = doc.toObject();
        gameSheet.hasWaitingRoom = false;
        gameSheet.topScores = [
            new TopScores(gameSheet.topScoresSolo),
            new TopScores(gameSheet.topScores1v1),
        ];

        return gameSheet;
    }

    public async saveGameSheet(gameSheet: GameSheet, type: GameType): Promise<mongoose.Document> {
        return this.performRequest(async (instance: typeof mongoose) => {
            const gameSheetDocument: mongoose.Document = new mongoose.models.GameSheet({
                name: gameSheet.name,
                id: gameSheet.id,
                topScoresSolo: (gameSheet.topScores[0] as TopScores).scores,
                topScores1v1: (gameSheet.topScores[1] as TopScores).scores,
                type: type,
            });

            return gameSheetDocument.save();
        });
    }

    public async getGameSheets(types: GameType[]): Promise<Map<GameType, GameSheet[]>> {
        return this.performRequest(async (instance: typeof mongoose) => {
            const map: Map<GameType, GameSheet[]> = new Map();

            return Promise.all(types.map(async (type: GameType) => {
                const documents: mongoose.Document[] = await mongoose.models.GameSheet.find({type: type}).exec();
                map.set(type, []);

                return documents.forEach((document: mongoose.Document) => {
                    const gameSheet: GameSheet = this.parseGameSheetDocument(document);
                    (map.get(type) as GameSheet[]).push(gameSheet);
                });
            })).then(() => map);
        });
    }

    public async reinitializeScores(id: string, type: GameType): Promise<void> {
        const TOP_SCORES_LENGTH: number = 2;
        const topScores: TopScores[] = [...Array(TOP_SCORES_LENGTH)].map(() => TopScores.generateTopScores());

        return this.performRequest(async (instance: typeof mongoose) => {
            return mongoose.models.GameSheet.updateOne({id: id, type: type}, {
                topScoresSolo: topScores[0].scores,
                topScores1v1: topScores[1].scores,
            }).exec();
        });
    }

    public async deleteGameSheet(id: string, type: GameType): Promise<DeleteResponse> {
        return this.performRequest(async (instance: typeof mongoose) => {
            return mongoose.models.GameSheet.deleteOne({id: id, type: type});
        });
    }

    public async getGameSheetId(name: string, type: GameType): Promise<string> {
        return this.performRequest(async (instance: typeof mongoose) => {
            return instance.models.GameSheet.findOne(
                {name: name, type: type},
            ).exec().then((doc: mongoose.Document) => {
                return this.parseGameSheetDocument(doc).id;
            });
        });
    }

    public async putScore(gameSheetId: string, username: string, time: number, mode: GameMode): Promise<GameSheet> {
        const now: Date = new Date();
        let gameSheet: GameSheet;
        // tslint:disable-next-line:triple-equals
        const table: string = mode == GameMode.Solo ? "topScoresSolo" : "topScores1v1";

        return this.performRequest(async (instance: typeof mongoose) => {
            return instance.models.GameSheet.findOneAndUpdate(
                {id: gameSheetId},
                {
                    $push: {
                        [table]: {
                            $each: [{username, time, date: now}],
                            $sort: {time: 1},
                            $slice: TopScores.SCORE_LENGTH,
                        },
                    },
                },
            ).exec().then(async (doc: mongoose.Document) => {
                gameSheet = this.parseGameSheetDocument(doc);

                return instance.disconnect();
            }).then(() => gameSheet);
        });
    }
}
