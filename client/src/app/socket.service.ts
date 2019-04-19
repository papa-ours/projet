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

    public sendFoundDiffrenceMessage(gameId: string, gameMode: GameMode): void {
        this.socket.emit("foundDifference", gameId, gameMode);
    }

    public sendErrorIdentificationMessage(gameId: string, gameMode: GameMode): void {
        this.socket.emit("errorIdentification", gameId, gameMode);
    }

    public getChatMessage(): Observable<ChatMessage> {
        return Observable.create((observer: Subject<ChatMessage>) => {
            this.socket.on("chatMessage", (data: ChatMessage) => {
                observer.next(data);
            });
        });
    }

    public getGameReady(): Observable<string> {
        return Observable.create((observer: Subject<string>) => {
            this.socket.on(`GameReady`, (id: string) => {
                observer.next(JSON.parse(id));
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

    public getUserJoined(): Observable<string[]> {
        return Observable.create((observer: Subject<string[]>) => {
            this.socket.on("UserJoined", (usernames: string) => {
                observer.next(JSON.parse(usernames));
            });
        });
    }

    public getGameSheetDeletion(id: string): Observable<void> {
        return Observable.create((observer: Subject<void>) => {
            this.socket.on(`GameSheetDeleted-${id}`, () => {
                observer.next();
            })
        });
    }
}
