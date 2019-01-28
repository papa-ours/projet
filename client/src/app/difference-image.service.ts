import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Message } from "../../../common/communication/message";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class DifferenceImageService {

    private readonly URL: string = "http://localhost:3000/api/imagedifference";
    public constructor(private http: HttpClient) { }

    public postDifferenceImageData(formData: FormData): Observable<Message> {
        return this.http.post<Message>(this.URL, {
                name:          formData.get("name"),
                originalImage: formData.get("originalImage"),
                modifiedImage: formData.get("modifiedImage"),
            }).pipe(catchError(this.handleError<Message>("postDifferenceImageData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
