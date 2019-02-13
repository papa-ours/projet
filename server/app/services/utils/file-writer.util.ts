import * as fs from "fs";

export class FileWriterUtil {
    public static writeFile(path: string, data: Uint8Array): Promise<Buffer> {
        return new Promise((reject: Function) => {
            fs.writeFile(path, data, (err: Error) => {
                if (err) {
                    reject(err);
                }
            });
        });
    }
}
