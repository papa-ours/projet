import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";
import { container } from "../inversify.config";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";

describe("DB connection service", async () => {

    let dbConnection: DBConnectionService;
    let mongodb: MongoMemoryServer;

    before(async () => {
        mongodb = new MongoMemoryServer();
        container.unbind(Types.DBConnectionServiceURI);
        container.bind(Types.DBConnectionServiceURI).toConstantValue(await mongodb.getUri());

        dbConnection = container.get(Types.DBConnectionService);
    });

    after(() => {
        mongodb.stop();
    });

    it("Should inject URL properly", async () => {
        expect(dbConnection["uri"]).to.equal(await mongodb.getUri());
    });
});
