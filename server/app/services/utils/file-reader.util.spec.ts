import { expect } from "chai";
import * as fs from "fs";
import { FileReaderUtil } from "./file-reader.util";

describe("file-reader.util", () => {
    let data: Buffer;
    fs.readFile("../client/src/assets/img/car_original.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
        data = fileData;
    });

    it("should resolve", async () => {
        const result: Buffer = await FileReaderUtil.readFile("../client/src/assets/img/car_original.bmp");

        expect(result).to.deep.equal(data);
    });

    it("should reject if the image doesn't exist", async () => {
        await FileReaderUtil.readFile("").catch((err: Error) => {

            expect(err.message).to.equals("ENOENT: no such file or directory, open ''");
        });
    });
});
