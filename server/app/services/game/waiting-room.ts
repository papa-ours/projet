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
        this.joinRoom(username).then(() => {
            Socket.io.to(`${this.gameSheetId}-${this.usernames[0]}`).emit("UserJoined", JSON.stringify(this.usernames));
            const REQUIRED_PLAYERS: number = 2;
            if (this.usernames.length === REQUIRED_PLAYERS) {
                this.startGame();
            }
        });
    }

    private startGame(): void {
        Axios.get(`${SERVER_ADDRESS}/api/game/${this.name}/${this.type}/${JSON.stringify(this.usernames)}`)
        .then((response: AxiosResponse<Message>) => {
            Socket.io.to(`${this.gameSheetId}-${this.usernames[0]}`).emit("GameReady", response.data.body);
        })
        .catch((error: Error) => console.error(error.message));
    }

    private async joinRoom(username: string): Promise<{}> {
        const id: string = (await Axios.get<Message>(`${SERVER_ADDRESS}/api/user/id/${username}`)).data.body;
        const socket: SocketIO.Socket | undefined = Socket.getSocket(id);

        return new Promise((resolve: Function) => {
            if (socket) {
                socket.join(`${this.gameSheetId}-${this.usernames[0]}`);
            }

            resolve();
        });
    }
}
