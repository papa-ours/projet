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
            const currentUser: User = {name: ""};

            socket.on("requestUsernameValidation", async (username: string) => {
                const message: Message = await this.usernameValidatorService.getUsernameValidation(username);

                if (message.body === "") {
                    currentUser.name = username;
                    DBConnectionService.getInstance().addUser(currentUser);
                }
                socket.emit("validation", message);
            });

            this.setupDisconnect(socket, currentUser);
        });
    }

    private setupDisconnect(socket: SocketIO.Socket, user: User): void {
        socket.on("disconnect", () => {
            if (user.name !== "") {
                this.deleteUser(user);
            }
        });
    }

    private deleteUser(user: User): void {
        DBConnectionService.getInstance().deleteUser(user);
    }
}
