import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { LOCAL_HOST_PORT } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DifferenceImageService {

    public readonly URL: string = `${LOCAL_HOST_PORT}/api/difference_image`;
    public constructor(private http: HttpClient) { }

    public postDifferenceImageData(formData: FormData): Observable<Message> {
        return this.http.post<Message>(this.URL, formData)
            .pipe(catchError(this.handleError<Message>("postDifferenceImageData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
