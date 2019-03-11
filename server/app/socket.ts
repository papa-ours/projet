import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { ChatEvent, ChatMessage, GameMode } from "../../common/communication/message";
import { ChatMessagePVPService } from "./services/chat-message-pvp.service";
import { ChatMessageSOLOService } from "./services/chat-message-solo.service";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    private io: SocketIO.Server;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.ChatMessageSOLOService) private chatMessageSOLOService: ChatMessageSOLOService,
        @inject(Types.ChatMessagePVPService) private chatMessagePVPService: ChatMessagePVPService,
    ) {}

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupDisconnect(socket);
            this.setupChatMessage(socket);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.sendDeconnectionMessage(socket);
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }

    private sendConnectionMessage(socket: SocketIO.Socket): void {
        if (this.usersContainerService.getUsernameByID(socket.id) !== "") {
            const message: ChatMessage = this.chatMessageSOLOService.getConnectionMessage(socket);
            this.io.emit("chatMessage", message);
        }
    }

    private sendDeconnectionMessage(socket: SocketIO.Socket): void {
        if (this.usersContainerService.getUsernameByID(socket.id) !== "") {
            const message: ChatMessage = this.chatMessageSOLOService.getDeconnectionMessage(socket);
            this.io.emit("chatMessage", message);
        }
    }

    private sendFoundDifferenceMessage(socket: SocketIO.Socket, gameMode: GameMode): void {
        gameMode === GameMode.SOLO ? this.chatMessageSOLOService.sendFoundDifferenceMessageSOLO(socket) :
                                     this.chatMessagePVPService.sendFoundDifferenceMessagePVP(socket);
    }

    private sendErrorIdentificationMessage(socket: SocketIO.Socket, gameMode: GameMode): void {
        gameMode === GameMode.SOLO ? this.chatMessageSOLOService.sendErrorIdentificationMessageSOLO(socket) :
                                     this.chatMessagePVPService.sendErrorIdentificationMessagePVP(socket);
    }

    private setupChatMessage(socket: SocketIO.Socket): void {
        socket.on("chatMessage", (event: ChatEvent, gameMode: GameMode) => {
            switch (event) {
                case ChatEvent.CONNECT:
                    this.sendConnectionMessage(socket);
                    break;
                case ChatEvent.FOUND_DIFFERENCE:
                    this.sendFoundDifferenceMessage(socket, gameMode);
                    break;
                case ChatEvent.ERROR_IDENTIFICATION:
                    this.sendErrorIdentificationMessage(socket, gameMode);
                    break;
                default: {
                    throw new TypeError("Unknown ChatEvent");
                }
            }
        });
    }
}
