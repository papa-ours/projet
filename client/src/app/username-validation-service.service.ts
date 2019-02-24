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
    private readonly BASE_URL: string = "http://localhost:3000/api/user/name";

    public constructor(
        public socketService: SocketService,
        private http: HttpClient,
    ) {}

    public deleteUsername(): void {
        this.socketService.socket.emit("deleteUsername", this.username);
    }

    public getUsernameValidation(name: string): Observable<string> {
        return this.http.post<Message>(this.BASE_URL, {name: name, socketid: this.socketService.id})
            .pipe(map((message: Message) => message.body),
        );
    }
}
