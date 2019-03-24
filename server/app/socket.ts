import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { GameMode } from "../../common/communication/game-description";
import { container } from "./inversify.config";
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
        this.chatMessageService = container.get<ChatMessageService>(Types.ChatMessageSoloService);
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

    public getIO(): SocketIO.Server {
        return this.io;
    }

    public sendBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): void {
        this.chatMessageService.sendBestTimeMessage(this.io, username, position, gameName, gameMode);
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
        socket.on("setGameType", (gameMode: GameMode) => {
            this.ChangeGameType(gameMode);
        });
    }

    private ChangeGameType(gameMode: GameMode): void {
        gameMode === GameMode.Solo ?
            this.chatMessageService = container.get<ChatMessageService>(Types.ChatMessageSoloService) :
            this.chatMessageService = container.get<ChatMessageService>(Types.ChatMessage1vs1Service);
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }
}
