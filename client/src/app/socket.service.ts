import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { ChatEvent, ChatMessage, GameMode } from "../../../common/communication/message";

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

    public sendChatMessage(event: ChatEvent, gameMode: GameMode): void {
        this.socket.emit("chatMessage", event, gameMode);
    }

    public getChatMessage = () => {
        // tslint:disable:no-any
        return Observable.create((observer: any) => {
            this.socket.on("chatMessage", (data: ChatMessage) => {
                observer.next(data);
            });
        });
    }
}
