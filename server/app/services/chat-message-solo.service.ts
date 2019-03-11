import { injectable } from "inversify";
import { ChatEvent, ChatMessage } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessageSOLOService extends ChatMessageService {

    public constructor(usersContainerService: UsersContainerService) {
        super(usersContainerService);
    }

    public sendFoundDifferenceMessageSOLO(socket: SocketIO.Socket): void {
        const textMessage: string = "Différence trouvée.";
        const message: ChatMessage = {chatTime: this.getTime(),
                                      chatEvent: ChatEvent.FOUND_DIFFERENCE,
                                      username: socket.id,
                                      text: textMessage};
        socket.emit("chatMessage", message);
    }

    public sendErrorIdentificationMessageSOLO(socket: SocketIO.Socket): void {
        const textMessage: string = "Erreur.";
        const message: ChatMessage = {chatTime: this.getTime(),
                                      chatEvent: ChatEvent.ERROR_IDENTIFICATION,
                                      username: socket.id,
                                      text: textMessage};
        socket.emit("chatMessage", message);
    }
}
