import { inject, injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { ChatMessageService } from "./chat-message.service";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessage1vs1Service extends ChatMessageService {

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
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
}
