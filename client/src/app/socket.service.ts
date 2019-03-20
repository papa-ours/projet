import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameType } from "../../../common/communication/game-description";
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

    public sendFoundDiffrenceMessage(gameType: GameType): void {
        this.sendGameMode(gameType);
        this.socket.emit("foundDifference");
    }

    public sendErrorIdentificationMessage(gameType: GameType): void {
        this.sendGameMode(gameType);
        this.socket.emit("errorIdentification");
    }

    public sendGameMode(gameType: GameType): void {
        this.socket.emit("setGameMode", gameType);
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
