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
            this.setupDisconnect(socket);
            this.setupDeleteUser(socket);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.deleteUser({name: "", socketId: socket.id});
        });
    }

    private setupDeleteUser(socket: SocketIO.Socket): void {
        socket.on("deleteUsername", (user: User) => {
            this.deleteUser(user);
        });
    }

    private deleteUser(user: User): void {
        DBConnectionService.getInstance().deleteUserById(user);
    }
}
