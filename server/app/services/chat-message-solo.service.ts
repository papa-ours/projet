import { injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessageSOLOService extends ChatMessageService {

    public constructor(
        usersContainerService: UsersContainerService,
        getCurrentTimeService: GetCurrentTimeService,
    ) {
        super(usersContainerService, getCurrentTimeService);
    }

    public sendFoundDifferenceMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = "Différence trouvée.";
            const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                          username: username,
                                          text: textMessage};
            socket.emit("chatMessage", message);
        }
    }

    public sendErrorIdentificationMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = "Erreur.";
            const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                          username: this.usersContainerService.getUsernameByID(socket.id),
                                          text: textMessage};
            socket.emit("chatMessage", message);
        }
    }

    public getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        const textMessage: string = `${username} obtient la place ${position} dans les meilleurs temps du jeu ${nomJeu} en solo`;

        return {chatTime: this.getCurrentTimeService.getCurrentTime(),
                username: socket.id,
                text: textMessage};

    }
}
