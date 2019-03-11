import { inject, injectable } from "inversify";
import { ChatEvent, ChatMessage, ChatTime } from "../../../common/communication/message";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessageService {

    public constructor(@inject(Types.UsersContainerService) public usersContainerService: UsersContainerService) {}

    public getConnectionMessage(socket: SocketIO.Socket): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        const textMessage: string = `${username} vient de se connecter.`;

        return {chatTime: this.getTime(),
                chatEvent: ChatEvent.CONNECT,
                username: socket.id,
                text: textMessage};
    }

    public getDeconnectionMessage(socket: SocketIO.Socket): ChatMessage {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        const textMessage: string = `${username} vient de se déconnecter.`;

        return {chatTime: this.getTime(),
                chatEvent: ChatEvent.DISCONNECT,
                username: socket.id,
                text: textMessage};
    }

    protected getTime(): ChatTime {
        const currentTime: Date = new Date();

        return {hours: currentTime.getHours(),
                minutes: this.checkTime(currentTime.getMinutes()),
                seconds: this.checkTime(currentTime.getSeconds())};
    }

    private checkTime(time: number): string {
        const FIRST_TWO_DIGITS_NUMBER: number = 10;
        let timeString: string = time.toString();
        if (time < FIRST_TWO_DIGITS_NUMBER) {
            timeString = "0" + timeString;
        }

        return timeString;
    }
}
