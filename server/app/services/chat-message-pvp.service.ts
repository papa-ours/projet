import { injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import { ChatMessageService } from "./chat-message.service";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessagePvpService extends ChatMessageService {

    public constructor(
        usersContainerService: UsersContainerService,
        getCurrentTimeService: GetCurrentTimeService,
    ) {
        super(usersContainerService, getCurrentTimeService);
    }

    public getIdentificationMessage(username: string, isDifferenceFound: boolean): ChatMessage {
        const textMessage: string = isDifferenceFound ? `Différence trouvée par ${username}.` : `Erreur par ${username}.`;

        return {
            chatTime: this.getCurrentTimeService.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    public getBestTimeMessage(username: string, position: number, gameName: string): ChatMessage {
        const textMessage: string = `${username} obtient la place ${position} dans les meilleurs temps du jeu ${gameName} en un contre un`;

        return {
            chatTime: this.getCurrentTimeService.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
