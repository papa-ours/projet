import * as fs from "fs";

export class FileReaderUtil {
    public static async readFile(path: string): Promise<Buffer> {
        return new Promise((resolve: (buffer: Buffer) => void, reject: Function) => {
            fs.readFile(path, (err: Error, data: Buffer) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
