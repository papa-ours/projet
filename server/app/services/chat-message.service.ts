import { inject, injectable } from "inversify";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { GetCurrentTimeService } from "./get-current-time.service";
import { UsersContainerService } from "./users-container.service";

@injectable()
export abstract class ChatMessageService {

    private isConnected: boolean;

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetCurrentTimeService) public getCurrentTimeService: GetCurrentTimeService,
    ) {
        this.isConnected = false;
    }

    public abstract sendFoundDifferenceMessage(socket: SocketIO.Socket): void;
    public abstract sendErrorIdentificationMessage(socket: SocketIO.Socket): void;
    public abstract getBestTimeMessage(socket: SocketIO.Socket, position: number, nomJeu: String): ChatMessage;

    public sendConnectionMessage(socket: SocketIO.Socket, io: SocketIO.Server): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const textMessage: string =  this.getConnectionMessage(username);
            const message: ChatMessage = {chatTime: this.getCurrentTimeService.getCurrentTime(),
                                          username: username,
                                          text: textMessage};
            io.emit("chatMessage", message);
        }
    }

    private getConnectionMessage(username: string): string {
        const tempMessage: string = this.isConnected ? `${username} vient de se déconnecter.` :
                                                       `${username} vient de se connecter.`;
        this.isConnected = !this.isConnected;

        return tempMessage;

    }
}
