import { expect } from "chai";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { ChatMessage } from "../../../common/communication/message";
import { container } from "../inversify.config";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";

describe("chat-message-service", () => {
    const userContainerService: UsersContainerService = container.get<UsersContainerService>(Types.UsersContainerService);

    it.only("should broadcast new user to all users", (done: Mocha.Func) => {
        const SOCKET1: SocketIOClient.Socket = io.connect(SERVER_ADDRESS);
        const USERNAME1: string = "username1";
        const expected: string = `${USERNAME1} vient de se connecter.`;

        userContainerService.addUser({name: USERNAME1, socketId: SOCKET1.id});

        SOCKET1.on("connection", () => {
            SOCKET1.emit("newUser");
            SOCKET1.on("chatMessage", (message: ChatMessage) => {
                expect(message.text).to.deep.equal(expected);
                SOCKET1.disconnect();
                setTimeout(done, 0);
            });
        });
    });

});
