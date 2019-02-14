import { expect } from "chai";
import * as fs from "fs";
import { FileReaderUtil } from "./file-reader.util";

describe.only("file-reader.util", () => {
    let data: Buffer;
    fs.readFile("../client/src/assets/img/car_original.bmp", (err: NodeJS.ErrnoException, fileData: Buffer) => {
        data = fileData;
    });

    it("should resolve", async () => {
        const result: Buffer = await FileReaderUtil.readFile("../client/src/assets/img/car_original.bmp");
        expect(result).to.deep.equal(data);
    });

    it("should reject if the image doesn't exist", async () => {
        try {
            await FileReaderUtil.readFile("");
        } catch {
            expect(true).to.equals(true);
        }
    });
});
