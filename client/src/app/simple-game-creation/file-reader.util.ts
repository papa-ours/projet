import { Observable, fromEvent } from "rxjs";

export interface FileReaderEventTarget extends EventTarget {
    result: ArrayBuffer;
    files: FileList;
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
}

export class FileReaderUtil {
    public readFile(file: File): Observable<Event> {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        return fromEvent(fileReader, "load");
    }
}
