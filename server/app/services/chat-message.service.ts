import { inject, injectable } from "inversify";
import { GameMode } from "../../../common/communication/game-description";
import { ChatMessage } from "../../../common/communication/message";
import { Socket } from "../socket";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";
import { GetCurrentTime } from "./utils/get-current-time.service";

@injectable()
export class ChatMessageService {

    private static readonly POSITION_STRING: string [] = ["première", "deuxième", "troisième"];

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
    ) {}

    public static sendBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): void {
        const message: ChatMessage = this.getBestTimeMessage(username, position, gameName, gameMode);
        Socket.io.emit("chatMessage", message);
    }

    private static getBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): ChatMessage {
        const gameModetext: string = gameMode === GameMode.Solo ? "solo" : "un contre un";
        const textMessage: string = username + " obtient la " + this.POSITION_STRING[position - 1]
            + " place dans les meilleurs temps du jeu " + gameName + " en " + gameModetext;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    public sendDifferenceIdentificationMessage(socket: SocketIO.Socket, isDifferenceFound: boolean, gameMode: GameMode): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getIdentificationMessage(username, isDifferenceFound, gameMode);
            socket.emit("chatMessage", message);
        }
    }

    public sendConnectionMessage(socket: SocketIO.Socket, isConnected: boolean): void {
        const username: string = this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getConnectionMessage(isConnected, username);
            Socket.io.emit("chatMessage", message);
        }
    }

    private getIdentificationMessage(username: string, isDifferenceFound: boolean, gameMode: GameMode): ChatMessage {
        const textMessage: string = this.getPrefixMessage(isDifferenceFound) + this.adjustMessageToGameMode(username, gameMode);

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    private getPrefixMessage(isDifferenceFound: boolean): string {

        return isDifferenceFound ? "Différence trouvée" : "Erreur";
    }

    private adjustMessageToGameMode(username: string, gameMode: GameMode): string {

        return gameMode === GameMode.Solo ? "." : ` par ${username}.`;
    }

    private getConnectionMessage(isConnected: boolean, username: string): ChatMessage {
        const textMessage: string = isConnected ? `${username} vient de se déconnecter.` : `${username} vient de se connecter.`;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
