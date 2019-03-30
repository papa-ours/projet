import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode, GameType } from "../../../common/communication/game-description";
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
        this.sendGameType(gameMode);
        this.socket.emit("foundDifference");
    }

    public sendErrorIdentificationMessage(gameMode: GameMode): void {
        this.sendGameType(gameMode);
        this.socket.emit("errorIdentification");
    }

    public sendGameType(gameMode: GameMode): void {
        this.socket.emit("setGameType", gameMode);
    }

    public getChatMessage = () => {
        return Observable.create((observer: Subject<ChatMessage>) => {
            this.socket.on("chatMessage", (data: ChatMessage) => {
                observer.next(data);
            });
        });
    }

    public getGameReady(name: string, type: GameType): Observable<string> {
        return Observable.create((observer: Subject<string>) => {
            this.socket.on(`GameReady-${name}-${type}`, (id: string) => {
                observer.next(id);
            });
        });
    }

    public getGameCreated(id: string): Observable<boolean> {
        return Observable.create((observer: Subject<boolean>) => {
            this.socket.on(`GameCreated-${id}`, (status: boolean) => {
                observer.next(status);
            });
        });
    }
}
