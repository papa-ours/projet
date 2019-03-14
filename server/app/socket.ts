import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { DifferenceIdentification, GameMode } from "../../common/communication/message";
import { ChatMessagePVPService } from "./services/chat-message-pvp.service";
import { ChatMessageSOLOService } from "./services/chat-message-solo.service";
import { ChatMessageService } from "./services/chat-message.service";
import { GetCurrentTimeService } from "./services/get-current-time.service";
import { UsersContainerService } from "./services/users-container.service";
import Types from "./types";

@injectable()
export class Socket {
    private io: SocketIO.Server;
    private chatMessageService: ChatMessageService;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
    ) {
        this.chatMessageService = new ChatMessageSOLOService(this.usersContainerService, this.getCurrentTimeService);
    }

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupNewUser(socket);
            this.setupFoundDifference(socket);
            this.setupErrorIdentification(socket);
            this.setupDisconnect(socket);
            this.setupGameMode(socket);
        });
    }

    private setupNewUser(socket: SocketIO.Socket): void {
       socket.on("newUser", () => {
            const isConnected: boolean = false;
            this.chatMessageService.sendConnectionMessage(socket, this.io, isConnected);
       });
    }

    private setupFoundDifference(socket: SocketIO.Socket): void {
        socket.on("foundDifference", () => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, DifferenceIdentification.DifferenceFound);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("errorIdentification", () => {
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, DifferenceIdentification.ErrorIdentification);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            const isConnected: boolean = true;
            this.chatMessageService.sendConnectionMessage(socket, this.io, isConnected);
            this.deleteUser(socket.id);
        });
    }

    private setupGameMode(socket: SocketIO.Socket): void {
        socket.on("setGameMode", (gameMode: GameMode) => {
            gameMode === GameMode.SOLO ? this.chatMessageService = new ChatMessageSOLOService(this.usersContainerService,
                                                                                              this.getCurrentTimeService) :
                                         this.chatMessageService = new ChatMessagePVPService(this.usersContainerService,
                                                                                             this.getCurrentTimeService);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
