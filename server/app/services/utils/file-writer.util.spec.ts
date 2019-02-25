import { expect } from "chai";
import { FileReaderUtil } from "./file-reader.util";
import { FileWriterUtil } from "./file-writer.util";

describe("FileWriterUtil", () => {

    it("should reject if the directory doesn't exist", (done: Mocha.Done) => {
        const data: Uint8Array = new Uint8Array([]);
        FileWriterUtil.writeFile("fakeDire/fakeFile.out", Buffer.from(data))
            .then(() => done(new Error("Promise should not resolve")))
            .catch(() => done());
    });

    it("should resolve if the directory exists", async () => {
        const data: Uint8Array = new Uint8Array([0, 1, 0, 1]);
        await FileWriterUtil.writeFile("test/test.bmp", Buffer.from(data));
        const readData: Buffer = await FileReaderUtil.readFile("test/test.bmp");
        const readArray: Uint8Array = new Uint8Array(readData);

        expect(readArray).to.deep.equals(data);
    });
});
