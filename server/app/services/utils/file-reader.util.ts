export class FileReaderUtil {
    public static readFile(path: string): Promise<Uint8Array> {
        return new Promise((resolve: Function, reject: Function) => {
            resolve(new Uint8Array([]));
        });
    }
}
