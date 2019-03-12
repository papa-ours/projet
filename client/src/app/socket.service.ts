import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { ChatMessage, GameMode} from "../../../common/communication/message";

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

    public sendFoundDiffrenceMessage(): void {
        this.socket.emit("foundDifference");
    }

    public sendErrorIdentificationMessage(): void {
        this.socket.emit("errorIdentification");
    }

    public sendGameMode(gameMode: GameMode): void {
        this.socket.emit("setGameMode", gameMode);
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
