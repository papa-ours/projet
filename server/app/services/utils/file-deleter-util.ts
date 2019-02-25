import * as fs from "fs";

export class FileDeleterUtil {
    public static async deleteFile(path: string): Promise<{}> {
        return new Promise((resolve: Function, reject: Function) => {
            fs.unlink(path, (err: Error) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
