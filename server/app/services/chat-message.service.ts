import { injectable } from "inversify";
import { ChatEvent, ChatMessage, ChatTime } from "../../../common/communication/message";
import { Socket } from "../../app/socket";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class ChatMessageService {

    public constructor(private socketIO: Socket, private usersContainerService: UsersContainerService) {}

    public sendConnectionMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `${username} vient de se connecter.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.CONNECT,
                                          username: socket.id,
                                          text: textMessage};
            this.socketIO.io.emit("chatMessage", message);
        }
    }

    public sendDeconnectionMessage(socket: SocketIO.Socket): void {
        const username: string =  this.usersContainerService.getUsernameByID(socket.id);
        if (username !== "") {
            const textMessage: string = `${username} vient de se déconnecter.`;
            const message: ChatMessage = {chatTime: this.getTime(),
                                          chatEvent: ChatEvent.DISCONNECT,
                                          username: socket.id,
                                          text: textMessage};
            this.socketIO.io.emit("chatMessage", message);
        }
    }

    private getTime(): ChatTime {
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
