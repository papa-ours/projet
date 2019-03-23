import { injectable } from "inversify";
import { ChatMessage, DifferenceIdentification } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessageSoloService extends ChatMessageService {

    public constructor(
        usersContainerService: UsersContainerService,
        getCurrentTimeService: GetCurrentTimeService,
    ) {
        super(usersContainerService, getCurrentTimeService);
    }

    public getIdentificationMessage(username: string, identification: DifferenceIdentification): string {

        return identification === DifferenceIdentification.DifferenceFound ? "Différence trouvée." : "Erreur.";
    }

    public getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        const textMessage: string = `${username} obtient la place ${position} dans les meilleurs temps du jeu ${nomJeu} en solo`;

        return {
            chatTime: this.getCurrentTimeService.getCurrentTime(),
            username: socket.id,
            text: textMessage,
        };
    }
}
