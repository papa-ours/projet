import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { ChatEvent, ChatMessage, GameMode } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    private socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io(SERVER_ADDRESS);
    }

    public get id(): string {
        return this.socket.id;
    }

    public sendChatMessage(event: ChatEvent): void {
        this.socket.emit("chatMessage", event);
    }

    public sendGameMode(gamemode: GameMode): void {
        this.socket.emit("setGameMode", gamemode);
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
