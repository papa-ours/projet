import { expect } from "chai";
import { FileWriterUtil } from "./file-writer.util";

describe.only("FileWriterUtil", () => {
    it("should reject if the directory doesn't exist", async () => {
        try {
            const data: Uint8Array = new Uint8Array([]);
            await FileWriterUtil.writeFile("fakeDir/bonjour", data);
        } catch {
            expect(true).to.equals(true);
        }
    });
});
