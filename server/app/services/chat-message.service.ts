import { inject, injectable } from "inversify";
import { GameMode } from "../../../common/communication/game-description";
import { ChatMessage, Connection, Identification } from "../../../common/communication/message";
import { Socket } from "../socket";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";
import { GetCurrentTime } from "./utils/get-current-time.service";

@injectable()
export class ChatMessageService {

    private readonly POSITION_STRING: string [] = ["première", "deuxième", "troisième"];

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
    ) {}

    public sendDifferenceIdentificationMessage(socket: SocketIO.Socket, identification: Identification, gameMode: GameMode): void {
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getIdentificationMessage(username, identification, gameMode);
            socket.emit("chatMessage", message);
        }
    }

    public sendConnectionMessage(socket: SocketIO.Socket, connection: Connection): void {
        const username: string = this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const message: ChatMessage = this.getConnectionMessage(connection, username);
            Socket.io.emit("chatMessage", message);
        }
    }

    public sendBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): void {
        const message: ChatMessage = this.getBestTimeMessage(username, position, gameName, gameMode);
        Socket.io.emit("chatMessage", message);
    }

    private getIdentificationMessage(username: string, identification: Identification, gameMode: GameMode): ChatMessage {
        const textMessage: string = this.getPrefixMessage(identification) + this.adjustMessageToGameMode(username, gameMode);

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    private getPrefixMessage(identification: Identification): string {

        return identification === Identification.DIFFERENCE_FOUND ? "Différence trouvée" : "Erreur";
    }

    private adjustMessageToGameMode(username: string, gameMode: GameMode): string {

        return gameMode === GameMode.Solo ? "." : ` par ${username}.`;
    }

    private getConnectionMessage(connection: Connection, username: string): ChatMessage {
        const textMessage: string = connection === Connection.CONNECT ?
            `${username} vient de se connecter.` :
            `${username} vient de se déconnecter.`;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }

    private getBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): ChatMessage {
        const gameModetext: string = gameMode === GameMode.Solo ? "solo" : "un contre un";
        const textMessage: string = `${username} obtient la ${this.POSITION_STRING[position]}`
            + ` place dans les meilleurs temps du jeu ${gameName} en ${gameModetext}`;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
