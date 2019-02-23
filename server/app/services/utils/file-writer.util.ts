import * as fs from "fs";

export class FileWriterUtil {
    public static async writeFile(path: string, data: Buffer): Promise<{}> {
        return new Promise((resolve: Function, reject: Function) => {
            fs.writeFile(path, data, (err: Error) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
