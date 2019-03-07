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
            this.deleteUser(socket.id);
            this.emitDeconnectionMessage(socket);
        });
    }

    private deleteUser(id: string): void {
        this.usersContainerService.deleteUserById(id);
    }

    private emitDeconnectionMessage(socket: SocketIO.Socket): void {
        const suffixMessage: string = " vient de se déconnecter.";
        const message: ChatMessage = {chatTime: this.getTime(), chatEvent: ChatEvent.DISCONNECT,
                                      username: socket.id,
                                      text: `${socket.id}${suffixMessage}`};
        this.io.emit("chatMessage", message);
    }

    private setupChatMessage(socket: SocketIO.Socket): void {
        socket.on("chatMessage", (event: ChatEvent) => {
            let message: ChatMessage;
            switch (event) {
                case ChatEvent.CONNECT:
                    const suffixMessage: string = " vient de se connecter.";
                    message = {chatTime: this.getTime(), chatEvent: event, username: socket.id, text: `${socket.id}${suffixMessage}`};
                    this.io.emit("chatMessage", message);
                    break;
                case ChatEvent.FOUND_DIFFERENCE:
                    const textMessage: string = "Différence trouvée.";
                    message = {chatTime: this.getTime(), chatEvent: event, username: socket.id, text: `${textMessage}`};
                    socket.emit("chatMessage", message);
                    break;
                case ChatEvent.ERROR_IDENTIFICATION:
                    message = {chatTime: this.getTime(), chatEvent: event, username: socket.id, text: "Erreur."};
                    socket.emit("chatMessage", message);
                    break;
                case ChatEvent.BEST_TIME:
                    message = {chatTime: this.getTime(), chatEvent: event, username: socket.id, text: `${socket.id}  obtient la POSITION place dans les meilleurs temps du
                    jeu NOM_JEU en solo.`};
                    this.io.emit("chatMessage", message);
                    break;
                default: {
                    message = {chatTime: this.getTime(), chatEvent: event, username: socket.id, text: ""};
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
