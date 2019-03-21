import { expect } from "chai";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { ChatMessage } from "../../../common/communication/message";
import { container } from "../inversify.config";
import { Server } from "../server";
import { Socket } from "../socket";
import Types from "../types";
import { UsersContainerService } from "./users-container.service";

// tslint:disable:max-func-body-length
describe.only("chat-message-service", () => {
    const server: Server = container.get<Server>(Types.Server);
    server.init();
    const socket: Socket = container.get<Socket>(Types.Socket);
    socket.init(server.getServer());

    const userContainerService: UsersContainerService = container.get<UsersContainerService>(Types.UsersContainerService);
    let socketClient: SocketIOClient.Socket;

    beforeEach((done: Mocha.Func) => {
        socketClient = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });
        socketClient.on("connect", () => {
            console.log("je suis connecté");
            const username: string = "Virasone";
            userContainerService.addUser({name: username, socketId: socketClient.id});
            setTimeout(done, 0);
        });
        socketClient.on("disconnect", () => {
            console.log("je suis déconnecté");
        });
    });

    afterEach((done: Mocha.Func) => {
        if (socketClient.connected) {
            socketClient.disconnect();
          }
        setTimeout(done, 0);
    });

    it("should send a message if a new user is connected", (done: Mocha.Func) => {
        socketClient.emit("newUser");
        const expected: string = "Virasone vient de se connecter.";
        socketClient.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message if a difference is found", (done: Mocha.Func) => {
        socketClient.emit("foundDifference");
        const expected: string = "Différence trouvée.";
        socketClient.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });
});
