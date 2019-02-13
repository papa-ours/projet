import * as fs from "fs";

export class FileWriterUtil {
    public static writeFile(path: string, data: Uint8Array): void {
        fs.writeFile(path, data, (err: Error) => {
            if (err) {
                console.error("An error occured while writing the file at " + path);
            }
        });
    }
}
