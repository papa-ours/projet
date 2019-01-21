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
    public constructor(server: http.Server) {
        this.io = socketio(server);
        this.setup();
    }

    private setup(): void {
        const MAX: number = 2;

        this.io.on("connection", (socket: SocketIO.Socket) => {
            const user: User = {
                name: "Allo",
                id: socket.id,
            };
            this.users.push(user);

            if (this.users.length > MAX) {
                const index: number = this.users.indexOf(user);
                if (index >= 0) {
                    this.users.splice(index, 1);
                }
                this.io.emit("maximum", this.users.length.toString());
            }

            this.io.on("disconnect", () => {
                const index: number = this.users.indexOf(user);
                if (index >= 0) {
                    this.users.splice(index, 1);
                }
            });
        });
    }
}
