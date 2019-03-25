import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";
import { SocketService } from "./socket.service";

@Injectable()
export class ConnectionService {

    public connected: boolean;
    public username: string;
    public readonly BASE_URL: string = `${SERVER_ADDRESS}/api/user/`;

    public constructor(
        public socketService: SocketService,
        private http: HttpClient,
    ) {
        this.connected = false;
        this.username = "";
    }

    public deleteUsername(): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + "delete/" + this.username);
    }

    public getUsernameValidation(name: string): Observable<string> {
        return this.http.post<Message>(this.BASE_URL + "name", {name: name, socketId: this.socketService.id})
            .pipe(map((message: Message) => message.body),
        );
    }
}
