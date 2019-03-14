import { expect } from "chai";
import { FileIO } from "./file-io.util";

describe("FileWriterUtil", () => {

    it("should reject if the directory doesn't exist", (done: Mocha.Done) => {
        const data: Uint8Array = new Uint8Array([]);
        FileIO.writeFile("fakeDire/fakeFile.out", Buffer.from(data))
            .then(() => done(new Error("Promise should not resolve")))
            .catch(() => done());
    });

    it("should resolve if the directory exists", async () => {
        const data: Uint8Array = new Uint8Array([0, 1, 0, 1]);
        await FileIO.writeFile("test/test.bmp", Buffer.from(data));
        const readData: Buffer = await FileIO.readFile("test/test.bmp");
        const readArray: Uint8Array = new Uint8Array(readData);

        expect(readArray).to.deep.equals(data);
    });
});
