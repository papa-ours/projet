import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameSheet, GameType } from "../../../common/communication/game-description";
import { TopScores } from "./score/top-scores";

interface DeleteResponse {
    ok?: number | undefined;
    n?: number | undefined;
}

@injectable()
export class DBConnectionService {
    private static instance: DBConnectionService;

    private readonly uri: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";
    public readonly gameSheetSchema: mongoose.Schema = new mongoose.Schema({
        name: String,
        id: String,
        topScores: Array,
        type: Number,
    });
    public connected: boolean = false;

    public constructor() {
        this.connect().catch((error: Error) => console.error(error.message));
        mongoose.model("GameSheet", this.gameSheetSchema);
    }

    public static getInstance(): DBConnectionService {
        if (!DBConnectionService.instance) {
            DBConnectionService.instance = new DBConnectionService();
        }

        return DBConnectionService.instance;
    }

    public async connect(): Promise<typeof mongoose> {
        return mongoose.connect(this.uri, {
            useNewUrlParser: true,
        });
    }

    public closeConnection(): void {
        mongoose.disconnect().catch((error: Error) => console.error(error.message));
    }

    public async saveGameSheet(gameSheet: GameSheet, type: GameType): Promise<mongoose.Document> {
        const gameSheetDocument: mongoose.Document = new mongoose.models.GameSheet({
            name: gameSheet.name,
            id: gameSheet.id,
            topScores: gameSheet.topScores,
            type: type,
        });

        return gameSheetDocument.save();
    }

    public async getGameSheets(type: GameType): Promise<GameSheet[]> {
        const documents: mongoose.Document[] = await mongoose.models.GameSheet.find({type: type}).exec();

        return documents.map((document: mongoose.Document) => {
            return document.toObject();
        });
    }

    public async reinitializeScores(id: string, type: GameType): Promise<{}> {
        const TOP_SCORES_LENGTH: number = 2;
        const topScores: TopScores[] = [...Array(TOP_SCORES_LENGTH)].map(() => new TopScores());

        return mongoose.models.GameSheet.updateOne({id: id, type: type}, {topScores: topScores}).exec();
    }

    public async deleteGameSheet(id: string, type: GameType): Promise<DeleteResponse> {
        return mongoose.models.GameSheet.deleteOne({id: id, type: type});
    }
}
