import { inject, injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export abstract class ChatMessageService {

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
    ) {}

    public abstract getIdentificationMessage(username: string, isDifferenceFound: boolean): ChatMessage;
    public abstract getBestTimeMessage(username: string, position: number, gameName: String): ChatMessage;

    public sendDifferenceIdentificationMessage(socket: SocketIO.Socket, isDifferenceFound: boolean): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getIdentificationMessage(username, isDifferenceFound);
            socket.emit("chatMessage", message);
        }
    }

    public sendConnectionMessage(socket: SocketIO.Socket, io: SocketIO.Server, isConnected: boolean): void {
        const username: string = this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const textMessage: string = this.getConnectionMessage(isConnected, username);
            const message: ChatMessage = {
                chatTime: this.getCurrentTimeService.getCurrentTime(),
                username: username,
                text: textMessage,
            };
            io.emit("chatMessage", message);
        }
    }

    public sendBestTimeMessage(io: SocketIO.Server, username: string, position: number, gameName: string): void {
        const message: ChatMessage = this.getBestTimeMessage(username, position, gameName);
        io.emit("chatMessage", message);
}

    private getConnectionMessage(isConnected: boolean, username: string): string {

        return isConnected ? `${username} vient de se déconnecter.` : `${username} vient de se connecter.`;
    }
}
