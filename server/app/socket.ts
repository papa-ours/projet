import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { Message } from "../../common/communication/message";
import { UsernameValidatorService } from "./services/username-validator.service";
import Types from "./types";

interface User {
    name?: string;
    socket: SocketIO.Socket;
}

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

            socket.on("requestUsernameValidation", (username: string) => {
                const message: Message = this.usernameValidatorService.getUsernameValidation(username, this.usernames);

                if (message.body === "") {
                    const user: User = {socket: socket, name: username};
                    currentUsername = username;
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
