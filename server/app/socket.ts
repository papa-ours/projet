import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { ChatEvent, ChatMessage, ChatTime } from "../../common/communication/message";
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
            this.sendDeconnectionMessage(socket);
            this.deleteUser(socket.id);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }

    private sendConnectionMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `${username} vient de se connecter.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.CONNECT,
                                          username: socket.id,
                                          text: textMessage};
            this.io.emit("chatMessage", message);
        }
    }

    private sendDeconnectionMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `${username} vient de se déconnecter.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.DISCONNECT,
                                          username: socket.id,
                                          text: textMessage};
            this.io.emit("chatMessage", message);
        }
    }

    private sendFoundDifferenceMessage(socket: SocketIO.Socket): void {
        const textMessage: string = "Différence trouvée.";
        const message: ChatMessage = {chatTime: this.getTime(), chatEvent: ChatEvent.FOUND_DIFFERENCE,
                                      username: socket.id,
                                      text: textMessage};
        socket.emit("chatMessage", message);
    }

    private sendErrorIdentificationMessage(socket: SocketIO.Socket): void {
        const textMessage: string = "Erreur.";
        const message: ChatMessage = {chatTime: this.getTime(),
                                      chatEvent: ChatEvent.ERROR_IDENTIFICATION,
                                      username: socket.id,
                                      text: textMessage};
        socket.emit("chatMessage", message);
    }

    private setupChatMessage(socket: SocketIO.Socket): void {
        socket.on("chatMessage", (event: ChatEvent) => {
            switch (event) {
                case ChatEvent.CONNECT:
                    this.sendConnectionMessage(socket);
                    break;
                case ChatEvent.FOUND_DIFFERENCE:
                    this.sendFoundDifferenceMessage(socket);
                    break;
                case ChatEvent.ERROR_IDENTIFICATION:
                    this.sendErrorIdentificationMessage(socket);
                    break;
                default: {
                    throw new TypeError("Unknown ChatEvent");
                }
            }
        });
    }

    private getTime(): ChatTime {
        const currentTime: Date = new Date();

        return {hours: currentTime.getHours(),
                minutes: this.checkTime(currentTime.getMinutes()),
                seconds: this.checkTime(currentTime.getSeconds())};
    }

    private checkTime(time: number): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;
        let timeString: string = time.toString();
        if (time < FIRST_TWO_DIGITS_NUMBER) {
            timeString = "0" + timeString;
        }

        return timeString;
    }
}
