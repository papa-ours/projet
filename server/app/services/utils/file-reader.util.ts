import * as fs from "fs";

export class FileReaderUtil {
    public static readFile(path: string): Promise<Uint8Array> {
        return new Promise((resolve: Function, reject: Function) => {
            fs.readFile(path, (err: Error, data: Uint8Array) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
