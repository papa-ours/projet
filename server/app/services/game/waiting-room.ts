import { inject } from "inversify";
import { GameType } from "../../../../common/communication/game-description";
import { Socket } from "../../socket";
import Types from "../../types";
import { UsersContainerService } from "../users-container.service";

export class WaitingRoom {
    public usernames: string[];

    public constructor(
        public gameSheetId: string,
        username: string,
        public type: GameType,
        @inject(Types.UsersContainerService) private usersContainer: UsersContainerService,
    ) {
        this.usernames = [];
        this.addUser(username);
    }

    public addUser(username: string): void {
        this.usernames.push(username);
        this.joinRoom(username);
    }

    private joinRoom(username: string): void {
        const socketId: string = this.usersContainer.getSocketIdByUsername(username);
        const socket: SocketIO.Socket | undefined = Socket.getSocket(socketId);

        if (socket) {
            socket.join(this.gameSheetId);
        }
    }
}
