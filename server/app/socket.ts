import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { GameType } from "../../common/communication/game-description";
import { ChatMessagePvpService } from "./services/chat-message-pvp.service";
import { ChatMessageSoloService } from "./services/chat-message-solo.service";
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
        this.chatMessageService = new ChatMessageSoloService(this.usersContainerService, this.getCurrentTimeService);
    }

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            this.setupNewUser(socket);
            this.setupFoundDifference(socket);
            this.setupErrorIdentification(socket);
            this.setupDisconnect(socket);
            this.setupGameType(socket);
        });
    }

    public sendBestTimeMessage(username: string, position: number, gameName: string, gameType: GameType): void {
        this.ChangeGameType(gameType);
        this.chatMessageService.sendBestTimeMessage(this.io, username, position, gameName);
    }

    private setupNewUser(socket: SocketIO.Socket): void {
       socket.on("newUser", () => {
            const isConnected: boolean = false;
            this.chatMessageService.sendConnectionMessage(socket, this.io, isConnected);
       });
    }

    private setupFoundDifference(socket: SocketIO.Socket): void {
        socket.on("foundDifference", () => {
            const isDifferenceFound: boolean = true;
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, isDifferenceFound);
        });
    }

    private setupErrorIdentification(socket: SocketIO.Socket): void {
        socket.on("errorIdentification", () => {
            const isDifferenceFound: boolean = false;
            this.chatMessageService.sendDifferenceIdentificationMessage(socket, isDifferenceFound);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            const isConnected: boolean = true;
            this.chatMessageService.sendConnectionMessage(socket, this.io, isConnected);
            this.deleteUser(socket.id);
        });
    }

    private setupGameType(socket: SocketIO.Socket): void {
        socket.on("setGameType", (gameType: GameType) => {
            this.ChangeGameType(gameType);
        });
    }

    private ChangeGameType(gameType: GameType): void {
        // triple equal problem
        // tslint:disable-next-line:triple-equals
        gameType == GameType.Simple ?
            this.chatMessageService = new ChatMessageSoloService(this.usersContainerService, this.getCurrentTimeService) :
            this.chatMessageService = new ChatMessagePvpService(this.usersContainerService, this.getCurrentTimeService);
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
