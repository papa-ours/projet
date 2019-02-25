import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameSheet, GameType } from "../../../common/communication/game-description";

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
        this.connect();
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

    public async saveGameSheet(gameSheet: GameSheet, type: GameType): Promise<mongoose.Document> {
        const gameSheetDocument: mongoose.Document = new mongoose.models.GameSheet({
            name: gameSheet.name,
            id: gameSheet.id,
            topScores: gameSheet.topScores,
            type: type,
        });

        return gameSheetDocument.save();
    }

    public async getGameSheets(type: GameType): Promise<mongoose.Document[]> {
        return mongoose.models.GameSheet2D.find({type: type}).exec();
    }
}
