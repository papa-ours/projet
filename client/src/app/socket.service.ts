import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode } from "../../../common/communication/game-description";
import { ChatMessage } from "../../../common/communication/message";

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

    public sendNewUserMessage(): void {
        this.socket.emit("newUser");
    }

    public sendFoundDiffrenceMessage(gameMode: GameMode): void {
        this.socket.emit("foundDifference", gameMode);
    }

    public sendErrorIdentificationMessage(gameMode: GameMode): void {
        this.socket.emit("errorIdentification", gameMode);
    }

    public getChatMessage(): Observable<ChatMessage> {
        return Observable.create((observer: Subject<ChatMessage>) => {
            this.socket.on("chatMessage", (data: ChatMessage) => {
                observer.next(data);
            });
        });
    }
}
