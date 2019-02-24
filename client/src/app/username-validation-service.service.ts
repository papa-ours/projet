import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Message } from "../../../common/communication/message";
import { SocketService } from "./socket.service";

@Injectable()
export class UsernameValidationService {

    private socket: SocketIOClient.Socket;
    public connected: boolean = false;
    public username: string = "";

    public constructor(public socketService: SocketService) {}

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
