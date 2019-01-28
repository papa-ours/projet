import * as http from "http";
import { inject, injectable } from "inversify";
import * as socketio from "socket.io";
import { Message } from "../../common/communication/message";
import { UsernameValidatorService } from "./services/username-validator.service";
import Types from "./types";

@injectable()
export class Socket {
    private users: string[] = [];
    private io: SocketIO.Server;

    public constructor(
        @inject(Types.UsernameValidatorService) private usernameValidatorService: UsernameValidatorService) {}

    public init(server: http.Server): void {
        this.io = socketio(server);

        this.io.on("connection", (socket: SocketIO.Socket) => {
            let currentUsername: string = "";

            socket.on("requestUsernameValidation", (username: string) => {
                const message: Message = this.usernameValidatorService.getUsernameValidation(username, this.users);

                if (message.body === "") {
                    currentUsername = username;
                    this.users.push(username);
                }
                socket.emit("validation", message);
            });

            socket.on("disconnect", () => {
                if (currentUsername !== "") {
                    this.deleteUser(currentUsername);
                }
            });
        });
    }

    private deleteUser(username: string): void {
        const index: number = this.users.indexOf(username);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }
}
