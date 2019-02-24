import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";
import { GameSheetDescription, GameType } from "../../../common/communication/game-description";
import { User } from "./user";

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

    public readonly userSchema: mongoose.Schema = new mongoose.Schema({
        name: String,
        socketId: String,
    });

    public connected: boolean = false;

    public constructor() {
        this.connect();

        mongoose.model("User", this.userSchema);
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

    public async getGameSheets(type: GameType): Promise<mongoose.Document[]> {
        return mongoose.models.GameSheet2D.find({}).exec();
    }

    public async getUsers(): Promise<User[]> {
        const userDocuments: mongoose.Document[] = await mongoose.models.User.find({});
        const users: User[] = (userDocuments.map((doc: mongoose.Document) => doc.toObject()));

        return new Promise<User[]>((resolve: Function) => {
            resolve(users);
        });
    }

    public addUser(user: User): void {
        new mongoose.models.User(user).save();
    }

    public deleteUserById(user: User): void {
        mongoose.models.User.deleteOne({socketId: user.socketId}, (err: Error) => {
            if (err) {
                console.error("An error has occurred while deleting the user with name " + user.name);
            }
        });
    }
}
