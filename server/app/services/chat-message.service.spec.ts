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
    let socketClient1: SocketIOClient.Socket;
    let socketClient2: SocketIOClient.Socket;

    beforeEach((done: Mocha.Func) => {
        socketClient1 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });
        socketClient1.on("connect", () => {
            const username1: string = "Username1";
            userContainerService.addUser({name: username1, socketId: socketClient1.id});

            socketClient2 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });
            socketClient2.on("connect", () => {
                const username2: string = "Username2";
                userContainerService.addUser({name: username2, socketId: socketClient2.id});
                setTimeout(done, 0);
            });
        });
    });

    afterEach((done: Mocha.Func) => {
        if (socketClient1.connected) {
            socketClient1.disconnect();
          }
        if (socketClient2.connected) {
            socketClient2.disconnect();
        }
        setTimeout(done, 0);
    });

    it("should send a message if a new user is connected", (done: Mocha.Func) => {
        socketClient1.emit("newUser");
        const expected: string = "Username1 vient de se connecter.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message if a difference is found", (done: Mocha.Func) => {
        socketClient1.emit("foundDifference");
        const expected: string = "Différence trouvée.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message if an error identification occured", (done: Mocha.Func) => {
        socketClient1.emit("errorIdentification");
        const expected: string = "Erreur.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });
});
