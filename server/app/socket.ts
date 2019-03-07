import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { ChatEvent, ChatMessage } from "../../common/communication/message";
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
            this.setupChatMessage(socket);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket): void {
        socket.on("disconnect", () => {
            this.deleteUser(socket.id);
            this.emitDeconnectionMessage(socket);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }

    private emitDeconnectionMessage(socket: SocketIO.Socket): void {
        const message: ChatMessage = {chatEvent: ChatEvent.DISCONNECT,
                                      username: socket.id,
                                      text: `${socket.id} vient de se déconnecter`};
        this.io.emit("chatMessage", message);
    }

    private setupChatMessage(socket: SocketIO.Socket): void {
        socket.on("chatMessage", (event: ChatEvent) => {
            let message: ChatMessage;
            switch (event) {
                case ChatEvent.CONNECT: {
                    message = {chatEvent: event, username: socket.id, text: `${socket.id} vient de se connecter`};
                    break;
                }
                case ChatEvent.FOUND_DIFFERENCE: {
                    message = {chatEvent: event, username: socket.id, text: `${socket.id} a trouvé une difference`};
                    break;
                }
                case ChatEvent.ERROR_IDENTIFICATION: {
                    message = {chatEvent: event, username: socket.id, text: `${socket.id} a fait une erreur d'identification`};
                    break;
                }
                default: {
                    message = {chatEvent: event, username: socket.id, text: ""};
                }
            }
            this.io.emit("chatMessage", message);
        });
    }
}
