import Axios, { AxiosResponse } from "axios";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameMode, GameType } from "../../../../common/communication/game-description";
import { Message } from "../../../../common/communication/message";
import { Socket } from "../../socket";

export class WaitingRoom {
    public usernames: string[];
    private readonly REQUIRED_PLAYERS: number = 2;
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
        if (this.usernames.length < this.REQUIRED_PLAYERS) {
            this.usernames.push(username);
            this.joinRoom(username).then(() => {
                Socket.io.to(`${this.gameSheetId}-${this.usernames[0]}`).emit("UserJoined", JSON.stringify(this.usernames));
                if (this.usernames.length === this.REQUIRED_PLAYERS) {
                    this.startGame();
                }
            });
        }
    }

    private startGame(): void {
        Axios.get(`${SERVER_ADDRESS}/api/game/id/${this.name}/${this.type}/${GameMode.Pvp}/${JSON.stringify(this.usernames)}`)
        .then((response: AxiosResponse<Message>) => {
            Axios.delete(`${SERVER_ADDRESS}/api/game/waitingRoom/${this.name}/${this.usernames[0]}/${this.type}`)
                .catch((error: Error) => console.error(error.message));
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
