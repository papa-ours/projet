import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { ChatMessage } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    private socket: SocketIOClient.Socket;
    private readonly BASE_URL: string = "http://localhost:3000";

    public constructor() {
        this.socket = io(this.BASE_URL);
    }

    public get id(): string {
        return this.socket.id;
    }

    public sendFoundDifferenceChat(): void {
        this.socket.emit("DifferenceFound", this.socket.id);
    }

    public sendErrorChat(): void {
        this.socket.emit("ErrorIdentification", this.socket.id);
    }

    public getChatMessage = () => {
        // tslint:disable:no-any
        return Observable.create((observer: any) => {
            this.socket.on("DifferenceFound", (data: ChatMessage) => {
                observer.next(data);
            });
        });
    }
}
