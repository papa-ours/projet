import Axios from "axios";
import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { SERVER_ADDRESS } from "../../common/communication/constants";
import { GameMode } from "../../common/communication/game-description";
import { Connection, Identification } from "../../common/communication/message";
import { ChatMessageService } from "./services/chat-message.service";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    public static io: SocketIO.Server;
    public static readonly sockets: SocketIO.Socket[] = [];

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.ChatMessageService)  public chatMessageService: ChatMessageService,
    ) {}

    public static getSocket(id: string): SocketIO.Socket | undefined {
        return Socket.sockets.find((socket: SocketIO.Socket) => {
            return id === socket.id;
        });
    }

    public init(server: http.Server): void {
        Socket.io = socketio(server);

        Socket.io.on("connection", (socket: SocketIO.Socket) => {
            Socket.sockets.push(socket);
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
        socket.on("foundDifference", (gameId: string, gameMode: GameMode) => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, gameId, Identification.DIFFERENCE_FOUND, gameMode);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("errorIdentification", (gameId: string, gameMode: GameMode) => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, gameId, Identification.ERROR, gameMode);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.chatMessageService.sendConnectionMessage(socket, Connection.DISCONNECT);
            try {
                this.deleteUser(socket.id);
            } catch (error) {
                console.error(error.message);
            }
        });
    }

    private deleteUser(id: string): void {
        Axios.delete(`${SERVER_ADDRESS}/api/game/waitingRoom/all/${this.usersContainerService.getUsernameBySocketId(id)}`)
            .catch((error: Error) => console.error(error.message));
        this.deleteSocket(id);
        this.usersContainerService.deleteUserById(id);
    }

    private deleteSocket(id: string): void {
        const index: number = Socket.sockets.findIndex((socket: SocketIO.Socket) => socket.id === id);

        if (index !== -1) {
            Socket.sockets.splice(index, 1);
        }
    }
}
