import { injectable } from "inversify";
import * as mongoose from "mongoose";
import "reflect-metadata";

@injectable()
export class DBConnectionService {
    private readonly uri: string = "mongodb+srv://ving34:pass123@cluster0-m1gwf.mongodb.net/test?retryWrites=true";

    public constructor() {
        this.connect();
    }

    private connect(): void {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
        });
    }
}
