import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import * as io from "socket.io-client";
import { Message } from "../../../common/communication/message";

@Injectable()
export class UsernameValidationService {

    private socket: SocketIOClient.Socket;
    public connected: boolean = false;
    public username: string = "";
    private readonly BASE_URL: string = "http://localhost:3000";

    public constructor() {
        this.socket = io(this.BASE_URL);
    }

    public sendUsername(username: string): void {
        this.socket.emit("requestUsernameValidation", username);
    }

    public deleteUsername(): void {
        this.socket.emit("deleteUsername", this.username);
    }

    public getUsernameValidation(): Observable<Message> {
        return new Observable<Message>((observer: Observer<Message>) => {
            this.socket.on("validation", (message: Message) => {
                observer.next(message);
            });
        });
    }
}
