import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameSheetDescription } from "../../../common/communication/game-description";

@injectable()
export class DBConnectionService {
    private static instance: DBConnectionService;

    private readonly uri: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";
    private readonly gameSheetSchema: mongoose.Schema = new mongoose.Schema({
        name: String,
        id: String,
        topScores: Array,
        type: Number,
    });
    public connected: boolean = false;

    public constructor() {
        this.connect();
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

    public async saveGameSheet2D(gameSheetDescription: GameSheetDescription): Promise<mongoose.Document> {
        const gameSheet: mongoose.Document = new mongoose.models.GameSheet2D(gameSheetDescription);

        return gameSheet.save();
    }

    public async getGameSheets2D(): Promise<mongoose.Document[]> {
        return mongoose.models.GameSheet2D.find({}).exec();
    }
}
