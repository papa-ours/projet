import { injectable } from "inversify";
import { ChatEvent, ChatMessage } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessagePVPService extends ChatMessageService {

    public constructor(usersContainerService: UsersContainerService) {
        super(usersContainerService);
    }

    public sendFoundDifferenceMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `Différence trouvée par ${username}.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.FOUND_DIFFERENCE,
                                          username: socket.id,
                                          text: textMessage};
            socket.emit("chatMessage", message);
        }
    }

    public sendErrorIdentificationMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `Erreur par ${username}.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.ERROR_IDENTIFICATION,
                                          username: socket.id,
                                          text: textMessage};
            socket.emit("chatMessage", message);
        }
    }

    public getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        const textMessage: string = `${username} obtient la place ${position} dans les meilleurs temps du jeu ${nomJeu} en un contre un`;

        return {chatTime: this.getTime(),
                chatEvent: ChatEvent.BEST_TIME,
                username: socket.id,
                text: textMessage};

    }
}
