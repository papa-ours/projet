import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    private io: SocketIO.Server;

    public constructor(
        @inject(Types.UsersContainerService) private usersContainerService: UsersContainerService,
    ) {}

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupDisconnect(socket);
            socket.on("DifferenceFound", (data: string) => {
                const message: string = `${data} a trouvé une difference`;
                socket.emit("DifferenceFound", message);
            });
            socket.on("ErrorIdentification", (data: string) => {
                const message: string = `${data} a fait une erreur d'identification`;
                socket.emit("ErrorIdentification", message);
            });
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
