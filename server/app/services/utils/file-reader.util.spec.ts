import { expect } from "chai";
import * as fs from "fs";
import { FileIO } from "./file-io.util";

describe("file-reader.util", () => {
    let data: Buffer;
    fs.readFile("../client/src/assets/img/car_original.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
        data = fileData;
    });

    it("should resolve", async () => {
        const result: Buffer = await FileIO.readFile("../client/src/assets/img/car_original.bmp");

        expect(result).to.deep.equal(data);
    });

    it("should reject if the image doesn't exist", (done: Mocha.Done) => {
        FileIO.readFile("")
            .then(() => done(new Error("Promise should not resolve")))
            .catch(() => done());
    });
});
