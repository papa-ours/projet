import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Message } from "../../../common/communication/message";

@Injectable()
export class UsernameValidationService {

    private socket: SocketIOClient.Socket;
    private readonly BASE_URL: string = "http://localhost:3000";

    public constructor() {
        this.socket = io(this.BASE_URL);
        this.socket.on("connected", (message: string) => console.log(message));
        this.socket.on("disconnected", (message: string) => console.log(message));
    }

    public sendUsername(username: string): void {
        console.log(username);
        this.socket.emit("validation", username, (validationMessage: Message) => {
            console.log(validationMessage);
        });
    }
}
