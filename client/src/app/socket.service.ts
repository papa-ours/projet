import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    private socket: SocketIOClient.Socket;
    private readonly BASE_URL: string = "http://localhost:3000";

    public constructor() {
        this.socket = io(this.BASE_URL);
        this.setUp();
    }

    public get id(): string {
        return this.socket.id;
    }

    private setUp(): void {
        this.socket.on("DifferenceFound", (data: string) => {
            console.log(data);
        });
        this.socket.on("ErrorIdentification", (data: string) => {
            console.log(data);
        });
    }

    public sendFoundDifferenceChat(): void {
        this.socket.emit("DifferenceFound", this.socket.id);
    }

    public sendErrorChat(): void {
        this.socket.emit("ErrorIdentification", this.socket.id);
    }
}
