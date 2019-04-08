import { inject, injectable } from "inversify";
import { GameMode } from "../../../common/communication/game-description";
import { ChatMessage, Connection, Identification } from "../../../common/communication/message";
import { Socket } from "../socket";
import Types from "../types";
import { AbstractGame } from "./game/game";
import { GetGameService } from "./get-game.service";
import { UsersContainerService } from "./users-container.service";
import { GetCurrentTime } from "./utils/get-current-time";

@injectable()
export class ChatMessageService {

    private readonly POSITION_STRING: string [] = ["première", "deuxième", "troisième"];

    public constructor(
        @inject(Types.UsersContainerService) public usersContainerService: UsersContainerService,
        @inject(Types.GetGameService) public getGameService: GetGameService,
    ) {}

    public sendDifferenceIdentificationMessage(
            socket: SocketIO.Socket, gameId: string, identification: Identification, gameMode: GameMode): void {
        const game: AbstractGame = this.getGameService.getGame(gameId);
        const username: string =  this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            const emitter: SocketIO.Socket | SocketIO.Namespace = gameMode == GameMode.Solo ?
                socket : Socket.io.to(`${game.sheetId}-${game.usernames[0]}`);
            emitter.emit("chatMessage", this.getIdentificationMessage(username, identification, gameMode));
        }
    }

    public sendConnectionMessage(socket: SocketIO.Socket, connection: Connection): void {
        const username: string = this.usersContainerService.getUsernameBySocketId(socket.id);
        if (username !== "") {
            Socket.io.emit("chatMessage", this.getConnectionMessage(connection, username));
        }
    }

    public sendBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): void {
        Socket.io.emit("chatMessage", this.getBestTimeMessage(username, position, gameName, gameMode));
    }

    private getIdentificationMessage(username: string, identification: Identification, gameMode: GameMode): ChatMessage {

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: this.getPrefixMessage(identification) + this.adjustMessageToGameMode(username, gameMode),
        };
    }

    private getPrefixMessage(identification: Identification): string {

        return identification === Identification.DIFFERENCE_FOUND ? "Différence trouvée" : "Erreur";
    }

    private adjustMessageToGameMode(username: string, gameMode: GameMode): string {

        return gameMode == GameMode.Solo ? "." : ` par ${username}.`;
    }

    private getConnectionMessage(connection: Connection, username: string): ChatMessage {

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: connection === Connection.CONNECT ? `${username} vient de se connecter.` : `${username} vient de se déconnecter.`,
        };
    }

    private getBestTimeMessage(username: string, position: number, gameName: string, gameMode: GameMode): ChatMessage {
        const gameModetext: string = gameMode == GameMode.Solo ? "solo" : "un contre un";
        const textMessage: string = `${username} obtient la ${this.POSITION_STRING[position]}`
            + ` place dans les meilleurs temps du jeu ${gameName} en ${gameModetext}`;

        return {
            chatTime: GetCurrentTime.getCurrentTime(),
            username: username,
            text: textMessage,
        };
    }
}
