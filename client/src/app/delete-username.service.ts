import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { Message } from "../../../common/communication/message";

@Injectable()
export class UsernameValidationService {

    private readonly BASE_URL: string = "http://localhost:3000/deleteUser/";
    public constructor(private http: HttpClient) { }

    public deleteUsername(username: string): Observable<Message> {
        return this.http.get<Message>(this.BASE_URL + username)
            .pipe(catchError(this.handleError<Message>("deleteUsername"))
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
