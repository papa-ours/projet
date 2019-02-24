import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Message } from "../../../common/communication/message";
import { SocketService } from "./socket.service";

@Injectable()
export class UsernameValidationService {

    public connected: boolean = false;
    public username: string = "";

    public constructor(public socketService: SocketService) {}

    public sendUsername(username: string): void {
        this.socketService.socket.emit("requestUsernameValidation", username);
    }

    public deleteUsername(): void {
        this.socketService.socket.emit("deleteUsername", this.username);
    }

    public getUsernameValidation(): Observable<Message> {
        return new Observable<Message>((observer: Observer<Message>) => {
            this.socketService.socket.on("validation", (message: Message) => {
                observer.next(message);
            });
        });
    }
}
