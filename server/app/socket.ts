import * as http from "http";
import { injectable } from "inversify";
import * as socketio from "socket.io";

interface User {
    name: string;
    id: string;
}

@injectable()
export class Socket {
    private users: User[] = [];
    private io: SocketIO.Server;

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            const user: User = {
                name: "User " + this.users.length,
                id: socket.id,
            };
            this.users.push(user);
            this.io.emit("connected", this.users.length);

            this.io.on("disconnect", () => {
                const index: number = this.users.indexOf(user);
                if (index >= 0) {
                    this.users.splice(index, 1);
                }
                this.io.emit("disconnected", "User " + user.name + " has quit");
            });
        });
    }
}
