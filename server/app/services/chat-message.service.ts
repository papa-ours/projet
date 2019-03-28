import { inject, injectable } from "inversify";
import { GameMode } from "../../../common/communication/game-description";
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
            const message: ChatMessage = this.getConnectionMessage(isConnected, username);
            io.emit("chatMessage", message);
        }
    }

    public sendBestTimeMessage(io: SocketIO.Server, username: string, position: number, gameName: string, gameMode: GameMode): void {
        const message: ChatMessage = this.getBestTimeMessage(username, position, gameName, gameMode);
        io.emit("chatMessage", message);
    }

    private getBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): ChatMessage {
        const gameModetext: string = gameMode === GameMode.Solo ? "solo" : "un contre un";
        const text: string = `${username} obtient la place ${position + 1} dans les meilleurs temps du jeu ${gameName} en ${gameModetext}`;

        return {
            chatTime: this.getCurrentTimeService.getCurrentTime(),
            username: username,
            text: text,
        };
    }

    private getConnectionMessage(isConnected: boolean, username: string): ChatMessage {
        const textMessage: string = isConnected ? `${username} vient de se déconnecter.` : `${username} vient de se connecter.`;

        return {
            chatTime: this.getCurrentTimeService.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
