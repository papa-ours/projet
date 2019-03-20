import * as fs from "fs";

export class FileIO {

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
