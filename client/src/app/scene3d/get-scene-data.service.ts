import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message, MessageType } from "../../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class GetSceneDataService {

    public readonly URL: string = "http://localhost:3000/api/scene";
    public constructor(private http: HttpClient) { }

    public postSceneData(nGeometry: number): Observable<Message> {
        const message: Message = {type: MessageType.SCENE_DATA, body: nGeometry.toString()};

        return this.http.post<Message>(this.URL, message)
            .pipe(catchError(this.handleError<Message>("postSceneData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
