import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    // @ts-ignore
    private socket: SocketIOClient.Socket;
    private readonly BASE_URL: string = "http://localhost:3000";

    public constructor() {
        this.socket = io(this.BASE_URL);
    }
}
