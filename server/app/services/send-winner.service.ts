import Axios from "axios";
import { injectable } from "inversify";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";
import { Socket } from "../socket";
import { AbstractGame } from "./game/game";

@injectable()
export class SendWinnerService {

    public sendWinner(game: AbstractGame): void {
        game.gameMode == GameMode.Solo ? this.sendWinnerSolo(game) : this.sendWinnerPvp(game);
    }

    private async sendWinnerSolo(game: AbstractGame): Promise<{}> {
        const id: string = (await Axios.get<Message>(`${SERVER_ADDRESS}/api/user/id/${game.usernames[game.winner]}`)).data.body;
        const socket: SocketIO.Socket | undefined = Socket.getSocket(id);

        return new Promise((resolve: Function) => {
            if (socket) {
                socket.emit("endGameWinner", game.usernames[game.winner]);
            }

            resolve();
        });
    }

    private sendWinnerPvp(game: AbstractGame): void {
        Socket.io.to(`${game.sheetId}-${game.usernames[0]}`).emit("endGameWinner", game.usernames[game.winner]);
    }
}
