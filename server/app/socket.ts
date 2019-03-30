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
    public static io: SocketIO.Server;
    public static readonly sockets: SocketIO.Socket[] = [];
    private chatMessageService: ChatMessageService;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
    ) {
        this.chatMessageService = container.get<ChatMessageService>(Types.ChatMessageSoloService);
    }

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
            this.setupGameType(socket);
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
            this.chatMessageService.sendConnectionMessage(socket, Socket.io, isConnected);
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
