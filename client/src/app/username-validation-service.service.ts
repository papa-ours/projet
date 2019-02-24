import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import * as io from "socket.io-client";
import { LOCAL_HOST_PORT } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";

@Injectable()
export class UsernameValidationService {

    private socket: SocketIOClient.Socket;
    public connected: boolean;
    public username: string;
    private readonly BASE_URL: string = `${LOCAL_HOST_PORT}`;

    public constructor() {
        this.socket = io(this.BASE_URL);
        this.connected = false;
        this.username = "";
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
