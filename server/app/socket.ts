import * as http from "http";
import { injectable } from "inversify";
import * as socketio from "socket.io";
import { Message } from "../../common/communication/message";
import { UsernameValidator } from "./routes/username-validator";

@injectable()
export class Socket {
    private users: string[] = [];
    private io: SocketIO.Server;
    private usernameValidator: UsernameValidator;

    public constructor() {
        this.usernameValidator = new UsernameValidator();
    }

    public init(server: http.Server): void {
        this.io = socketio(server);

        // const addUserNamespace: SocketIO.Namespace = this.io.of("/addUser");
        this.io.on("connection", (socket: SocketIO.Socket) => {
            let currentUsername: string = "";

            // tslint:disable-next-line:no-any
            socket.on("validation", (username: string, answerFunction: any) => {
                const message: Message = this.usernameValidator.getUsernameValidation(username, this.users);

                if (message.body === "") {
                    currentUsername = username;
                    this.users.push(username);
                }

                answerFunction(message);
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
