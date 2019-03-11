import { injectable } from "inversify";
import { ChatEvent, ChatMessage } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessagePVPService extends ChatMessageService {

    public constructor(usersContainerService: UsersContainerService) {
        super(usersContainerService);
    }

    public sendFoundDifferenceMessagePVP(socket: SocketIO.Socket): void {
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

    public sendErrorIdentificationMessagePVP(socket: SocketIO.Socket): void {
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
}
