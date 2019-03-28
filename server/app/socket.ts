import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { GameMode } from "../../common/communication/game-description";
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

    public sendBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): void {
        this.chatMessageService.sendBestTimeMessage(Socket.io, username, position, gameName, gameMode);
    }

    private setupNewUser(socket: SocketIO.Socket): void {
       socket.on("newUser", () => {
            const isConnected: boolean = false;
            this.chatMessageService.sendConnectionMessage(socket, Socket.io, isConnected);
       });
    }

    private setupFoundDifference(socket: SocketIO.Socket): void {
        socket.on("foundDifference", (gameMode: GameMode) => {
            const isDifferenceFound: boolean = true;
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, isDifferenceFound, gameMode);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("errorIdentification", (gameMode: GameMode) => {
            const isDifferenceFound: boolean = false;
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, isDifferenceFound, gameMode);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            const isConnected: boolean = true;
            this.chatMessageService.sendConnectionMessage(socket, Socket.io, isConnected);
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
