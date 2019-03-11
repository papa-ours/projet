import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { ChatEvent, ChatMessage, GameMode } from "../../common/communication/message";
import { ChatMessagePVPService } from "./services/chat-message-pvp.service";
import { ChatMessageSOLOService } from "./services/chat-message-solo.service";
import { ChatMessageService } from "./services/chat-message.service";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    private io: SocketIO.Server;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.ChatMessageService) private chatMessageService: ChatMessageService,
    ) {
        this.chatMessageService = new ChatMessageSOLOService(usersContainerService);
    }

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupDisconnect(socket);
            this.setupChatMessage(socket);
            this.setupSwitchGameMode(socket);
        });
    }

    public sendBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String, gameMode: GameMode): void {
        const message: ChatMessage = this.chatMessageService.getBestTimeMessage(socket, position, nomJeu);
        this.io.emit("chatMessage", message);
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.sendDeconnectionMessage(socket);
            this.deleteUser(socket.id);
        });
    }

    private setupChatMessage(socket: SocketIO.Socket): void {
        socket.on("chatMessage", (event: ChatEvent) => {
            switch (event) {
                case ChatEvent.CONNECT:
                    this.sendConnectionMessage(socket);
                    break;
                case ChatEvent.FOUND_DIFFERENCE:
                    this.chatMessageService.sendFoundDifferenceMessage(socket);
                    break;
                case ChatEvent.ERROR_IDENTIFICATION:
                    this.chatMessageService.sendErrorIdentificationMessage(socket);
                    break;
                default: {
                    throw new TypeError("Unknown ChatEvent");
                }
            }
        });
    }

    private setupSwitchGameMode(socket: SocketIO.Socket): void {
        socket.on("setGameMode", (gameMode: GameMode) => {
            this.setGameMode(gameMode);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }

    private sendConnectionMessage(socket: SocketIO.Socket): void {
        if (this.usersContainerService.getUsernameByID(socket.id) !== "") {
            const message: ChatMessage = this.chatMessageService.getConnectionMessage(socket);
            this.io.emit("chatMessage", message);
        }
    }

    private sendDeconnectionMessage(socket: SocketIO.Socket): void {
        if (this.usersContainerService.getUsernameByID(socket.id) !== "") {
            const message: ChatMessage = this.chatMessageService.getDeconnectionMessage(socket);
            this.io.emit("chatMessage", message);
        }
    }

    private setGameMode(gameMode: GameMode): void {
        gameMode === GameMode.SOLO ? this.chatMessageService = new ChatMessageSOLOService(this.usersContainerService) :
                                     this.chatMessageService = new ChatMessagePVPService(this.usersContainerService);
    }
}
