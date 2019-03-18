import { fromEvent, Observable } from "rxjs";

export class FileIO {
    public readFile(file: File): Observable<Event> {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        return fromEvent(fileReader, "load");
    }
}
