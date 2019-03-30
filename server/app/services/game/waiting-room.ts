import Axios, { AxiosResponse } from "axios";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { Message } from "../../../../common/communication/message";
import { Socket } from "../../socket";

export class WaitingRoom {
    public usernames: string[];

    public constructor(
        public gameSheetId: string,
        public name: string,
        username: string,
        public type: GameType,
    ) {
        this.usernames = [];
        this.addUser(username);
    }

    public addUser(username: string): void {
        this.usernames.push(username);
        this.joinRoom(username);

        const REQUIRED_PLAYERS: number = 2;
        if (this.usernames.length === REQUIRED_PLAYERS) {
            this.startGame();
        }
    }

    private startGame(): void {
        Axios.get(`${SERVER_ADDRESS}/api/game/${this.name}/${this.type}/${this.usernames[0]}`)
        .then((response: AxiosResponse<Message>) => {
            Socket.io.to(this.gameSheetId).emit("GameReady", response.data.body);
        })
        .catch((error: Error) => console.error(error.message));
    }

    private joinRoom(username: string): void {
        Axios.get(`${SERVER_ADDRESS}/api/user/id/${username}`)
        .then((response: AxiosResponse<Message>) => {
            const socket: SocketIO.Socket | undefined = Socket.getSocket(response.data.body);
            if (socket) {
                socket.join(this.gameSheetId);
            }
        })
        .catch((error: Error) => console.error(error.message));
    }
}
