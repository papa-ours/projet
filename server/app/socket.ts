import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { ChatMessage } from "../../common/communication/message";
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
            this.setupDifferenceFound(socket);
            this.setupErrorIdentification(socket);
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

    private setupDifferenceFound(socket: SocketIO.Socket): void {
        socket.on("DifferenceFound", (socketId: string) => {
            const message: ChatMessage = {username: socketId, text: `${socketId} a trouvé une difference`};
            this.io.emit("DifferenceFound", message);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("ErrorIdentification", (socketId: string) => {
            const message: ChatMessage = {username: socketId, text: `${socketId} a fait une erreur d'identification`};
            this.io.emit("ErrorIdentification", message);
        });
    }
}
