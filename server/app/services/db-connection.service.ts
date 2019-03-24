import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameSheet, GameType } from "../../../common/communication/game-description";
import { Score } from "./score/score";
import { TopScores } from "./score/top-scores";

interface DeleteResponse {
    ok?: number;
    n?: number;
}

@injectable()
export class DBConnectionService {
    private readonly uri: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";
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

    private async performRequest<T>(request: (instance: typeof mongoose) => T): Promise<T> {
        const instance: typeof mongoose = await this.connect();
        const t: T = await request(instance);

        return instance.disconnect().then(() => t);
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

    public async saveGameSheet(gameSheet: GameSheet, type: GameType): Promise<mongoose.Document> {
        return this.performRequest((instance: typeof mongoose) => {
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
                    const gameSheet: GameSheet & {topScoresSolo: Score[], topScores1v1: Score[]} = document.toObject();
                    gameSheet.topScores = [];
                    gameSheet.topScores[0] = new TopScores(gameSheet.topScoresSolo);
                    gameSheet.topScores[1] = new TopScores(gameSheet.topScores1v1);

                    (map.get(type) as GameSheet[]).push(gameSheet);
                });
            })).then(() => map);
        });
    }

    public async reinitializeScores(id: string, type: GameType): Promise<{}> {
        const TOP_SCORES_LENGTH: number = 2;
        const topScores: TopScores[] = [...Array(TOP_SCORES_LENGTH)].map(() => TopScores.generateTopScores());

        return this.performRequest((instance: typeof mongoose) => {
            return mongoose.models.GameSheet.updateOne({id: id, type: type}, {topScores: topScores}).exec();
        });
    }

    public async deleteGameSheet(id: string, type: GameType): Promise<DeleteResponse> {
        return this.performRequest((instance: typeof mongoose) => {
            return mongoose.models.GameSheet.deleteOne({id: id, type: type});
        });
    }

    public async getGameSheetId(name: string, type: GameType): Promise<string> {
        return this.performRequest((instance: typeof mongoose) => {
            return instance.models.GameSheet.findOne(
                {name: name, type: type},
            ).exec();
        });
    }

    public async putSoloScore(gameSheetId: string, username: string, time: number): Promise<void> {
        const now: Date = new Date();

        return this.performRequest((instance: typeof mongoose) => {
            instance.models.GameSheet.findOneAndUpdate(
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
            ).exec();
        });
    }
}
