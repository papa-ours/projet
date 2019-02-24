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

    private deleteUser(username: string): void {
        DBConnectionService.getInstance().deleteUser({name: username});
    }
}
