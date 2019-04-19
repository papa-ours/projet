import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";
import { container } from "../inversify.config";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { DUMMY_DATABASE } from "./db-connection.service.spec.dummy";

let mongodb: MongoMemoryServer;
let dbConnection: DBConnectionService;

before(async () => {
    mongodb = new MongoMemoryServer();
    DBConnectionService[`${"URI"}`] = await mongodb.getUri();
    dbConnection = container.get<DBConnectionService>(Types.DBConnectionService);
});

after(async () => {
    return mongodb.stop();
});

beforeEach(async () => {
    return dbConnection["performRequest"](async (instance: typeof mongoose) => {
        await instance.models.GameSheet.deleteMany({});
        await instance.models.GameSheet.create(DUMMY_DATABASE);
    });
});

describe("DB connection service", async () => {

    it("Should inject URL properly", async () => {
        expect(DBConnectionService["URI"]).to.equal(await mongodb.getUri());
    });
});
