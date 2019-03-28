import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { GameMode } from "../../common/communication/game-description";
import { Connection, Identification } from "../../common/communication/message";
import { ChatMessageService } from "./services/chat-message.service";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    public static io: SocketIO.Server;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.ChatMessageService)  public chatMessageService: ChatMessageService,
    ) {}

    public init(server: http.Server): void {
        Socket.io = socketio(server);

        Socket.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupNewUser(socket);
            this.setupFoundDifference(socket);
            this.setupErrorIdentification(socket);
            this.setupDisconnect(socket);
        });
    }

    private setupNewUser(socket: SocketIO.Socket): void {
       socket.on("newUser", () => {
            this.chatMessageService.sendConnectionMessage(socket, Connection.CONNECT);
       });
    }

    private setupFoundDifference(socket: SocketIO.Socket): void {
        socket.on("foundDifference", (gameMode: GameMode) => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, Identification.DIFFERENCE_FOUND, gameMode);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("errorIdentification", (gameMode: GameMode) => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, Identification.ERROR, gameMode);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.chatMessageService.sendConnectionMessage(socket, Connection.DISCONNECT);
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
