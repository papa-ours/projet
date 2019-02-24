import * as http from "http";
import { injectable } from "inversify";
import * as socketio from "socket.io";
import { DBConnectionService } from "./services/dbconnection.service";

@injectable()
export class Socket {
    private io: SocketIO.Server;

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupDisconnect(socket);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        DBConnectionService.getInstance().deleteUserById(id);
    }
}
