import { inject, injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export abstract class ChatMessageService {

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
    ) {}

    public abstract sendFoundDifferenceMessage(socket: SocketIO.Socket): void;
    public abstract sendErrorIdentificationMessage(socket: SocketIO.Socket): void;
    public abstract getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage;

    public sendNewUserMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username === "") {

            return;
        }
        const textMessage: string = `${username} vient de se connecter.`;
        const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                      username: socket.id,
                                      text: textMessage};

        io.emit("chatMessage", message);
    }

    public sendDisconnectionMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username === "") {

            return;
        }
        const textMessage: string = `${username} vient de se déconnecter.`;
        const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                      username: socket.id,
                                      text: textMessage};

        io.emit("chatMessage", message);
    }
}
