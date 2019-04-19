import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";
import { container } from "../inversify.config";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";

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

describe("DB connection service", async () => {

    it("Should inject URL properly", async () => {
        expect(dbConnection["uri"]).to.equal(await mongodb.getUri());
    });
});
