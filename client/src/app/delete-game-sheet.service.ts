import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameType } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class GameSheetService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/game/sheet`;
    public constructor(private http: HttpClient) { }

    public deleteGameSheet(id: string, type: GameType): Observable<Message> {
        return this.http.delete<Message>(`${this.URL}/${id}/${type}`)
            .pipe(catchError(this.handleError<Message>("deleteGameSheet")),
        );
    }

    public reinitializeScores(id: string, type: GameType): Observable<Message> {
        return this.http.post<Message>(this.URL, {id: id, type: type})
            .pipe(catchError(this.handleError<Message>("reinitializeScores")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
