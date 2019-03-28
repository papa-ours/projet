import { inject, injectable } from "inversify";
import { GameMode } from "../../../common/communication/game-description";
import { ChatMessage } from "../../../common/communication/message";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";
import { GetCurrentTime } from "./utils/get-current-time.service";

@injectable()
export class ChatMessageService {

    private readonly POSITION_STRING: string [] = ["première", "deuxième", "troisième"];

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
    ) {}

    public sendDifferenceIdentificationMessage(socket: SocketIO.Socket, isDifferenceFound: boolean, gameMode: GameMode): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getIdentificationMessage(username, isDifferenceFound, gameMode);
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

    private getIdentificationMessage(username: string, isDifferenceFound: boolean, gameMode: GameMode): ChatMessage {
        const textMessage: string = isDifferenceFound ?
            "Différence trouvée" + this.adjustMessageToGameMode(username, gameMode) :
            "Erreur" + this.adjustMessageToGameMode(username, gameMode);

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    private adjustMessageToGameMode(username: string, gameMode: GameMode): string {

        return gameMode === GameMode.Solo ? "." : ` par ${username}.`;
    }

    private getBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): ChatMessage {
        const gameModetext: string = gameMode === GameMode.Solo ? "solo" : "un contre un";
        const textMessage: string = username + " obtient la " + this.POSITION_STRING[position - 1]
            + " place dans les meilleurs temps du jeu " + gameName + " en " + gameModetext;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
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
