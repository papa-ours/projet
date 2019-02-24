import * as http from "http";
import { injectable } from "inversify";
import * as socketio from "socket.io";
import { DBConnectionService } from "./services/dbconnection.service";
import { User } from "./services/user";

@injectable()
export class Socket {
    private io: SocketIO.Server;

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            const currentUser: User = {name: ""};

            this.setupDisconnect(socket, currentUser);
            this.setupDeleteUser(socket);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket, user: User): void {
        socket.on("disconnect", () => {
            if (user.name !== "") {
                this.deleteUser(user);
            }
        });
    }

    private setupDeleteUser(socket: SocketIO.Socket): void {
        socket.on("deleteUsername", (username: string) => {
            this.deleteUser({name: username});
        });
    }

    private deleteUser(user: User): void {
        DBConnectionService.getInstance().deleteUser(user);
    }
}
