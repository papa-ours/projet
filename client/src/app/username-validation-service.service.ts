import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Message } from "../../../common/communication/message";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UsernameValidationService {

    private readonly BASE_URL: string = "http://localhost:3000/addUser/";
    public constructor(private http: HttpClient) { }

    public getUsernameValidation(username: string): Observable<Message> {
        return this.http.get<Message>(this.BASE_URL + username)
            .pipe(catchError(this.handleError<Message>("getUsernameValidation")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
