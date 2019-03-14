import { injectable } from "inversify";
import { ChatMessage, DifferenceIdentification } from "../../../common/communication/message";
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

    public sendDifferenceIdentificationMessage(socket: SocketIO.Socket, identification: DifferenceIdentification): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const textMessage: string = this.getIdentificationMessage(identification);
            const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                          username: username,
                                          text: textMessage};
            socket.emit("chatMessage", message);
        }
    }

    private getIdentificationMessage(identification: DifferenceIdentification): string {

        return identification === DifferenceIdentification.DifferenceFound ? "Différence trouvée." : "Erreur.";

    }

    public getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        const textMessage: string = `${username} obtient la place ${position} dans les meilleurs temps du jeu ${nomJeu} en solo`;

        return {chatTime: this.getCurrentTimeService.getCurrentTime(),
                username: socket.id,
                text: textMessage};

    }
}
