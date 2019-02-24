import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { Message } from "../../common/communication/message";
import { DBConnectionService } from "./services/dbconnection.service";
import { User } from "./services/user";
import { UsernameValidatorService } from "./services/username-validator.service";
import Types from "./types";


@injectable()
export class Socket {
    private users: User[] = [];
    private io: SocketIO.Server;

    public constructor(
        @inject(Types.UsernameValidatorService) private usernameValidatorService: UsernameValidatorService) {}

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            let currentUsername: string = "";

            socket.on("requestUsernameValidation", async (username: string) => {
                const message: Message = await this.usernameValidatorService.getUsernameValidation(username);

                if (message.body === "") {
                    const user: User = {name: username};
                    currentUsername = username;
                    DBConnectionService.getInstance().addUser(user);
                    this.users.push(user);
                }
                socket.emit("validation", message);
            });

            socket.on("deleteUsername", (username: string) => {
                this.deleteUser(username);
            });

            socket.on("disconnect", () => {
                if (currentUsername !== "") {
                    this.deleteUser(currentUsername);
                }
            });
        });
    }

    private get usernames(): string[] {
        return this.users.map((user: User) => user.name as string);
    }

    private deleteUser(username: string): void {
        const index: number = this.usernames.indexOf(username);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
