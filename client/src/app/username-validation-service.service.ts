import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../../../common/communication/message";
import { SocketService } from "./socket.service";

@Injectable()
export class UsernameValidationService {

    public connected: boolean = false;
    public username: string = "";
    public readonly BASE_URL: string = "http://localhost:3000/api/user/";

    public constructor(
        public socketService: SocketService,
        private http: HttpClient,
    ) {}

    public deleteUsername(): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + "delete/" + this.username);
    }

    public getUsernameValidation(name: string): Observable<string> {
        return this.http.post<Message>(this.BASE_URL + "name", {name: name, socketId: this.socketService.id})
            .pipe(map((message: Message) => message.body),
        );
    }
}
