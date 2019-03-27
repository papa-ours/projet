import { inject, injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { ChatMessageService } from "./chat-message.service";
import { UsersContainerService } from "./users-container.service";
import { GetCurrentTime } from "./utils/get-current-time.service";

@injectable()
export class ChatMessage1vs1Service extends ChatMessageService {

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
    ) {
        super(usersContainerService);
    }

    public getIdentificationMessage(username: string, isDifferenceFound: boolean): ChatMessage {
        const textMessage: string = isDifferenceFound ? `Différence trouvée par ${username}.` : `Erreur par ${username}.`;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
