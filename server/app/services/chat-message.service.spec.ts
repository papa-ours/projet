import { expect } from "chai";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode, GameType } from "../../../common/communication/game-description";
import { ChatMessage } from "../../../common/communication/message";
import { container } from "../inversify.config";
import { Server } from "../server";
import { Socket } from "../socket";
import Types from "../types";
import { ChatMessageService } from "./chat-message.service";
import { UsersContainerService } from "./users-container.service";

describe("chat-message-service", () => {
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
                setTimeout(done, 0);
            });
        });
    });

    afterEach((done: Mocha.Func) => {
        socketClient1.disconnect();
        socketClient2.disconnect();
        setTimeout(done, 0);
    });

    after((done: Mocha.Func) => {
        socketClient1.disconnect();
        socketClient2.disconnect();
        Socket.io.close();
        server.getServer().close();
        setTimeout(done, 0);
    });

    it("should send a message to all users if a new user is connected", (done: Mocha.Func) => {
        socketClient1.emit("newUser");
        const expected: string = "Username1 vient de se connecter.";
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            expect(result1.text).to.deep.equals(expected);
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                expect(result2.text).to.deep.equals(expected);
                setTimeout(done, 0);
            });
        });
    });

    it("should not send a connection message to all users if a new user has no username", (done: Mocha.Func) => {
        socketClient2.emit("newUser");
        const expected: boolean = false;
        let receivedMessage: boolean = false;
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            receivedMessage = true;
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                receivedMessage = true;
            });
        });
        const TWO_SEC: number = 2000;
        setTimeout(
            () => {
                expect(expected).to.be.equal(receivedMessage);
                setTimeout(done, 0);
            },
            TWO_SEC,
        );
    });

    it("should send a message if a difference is found in solo mode", (done: Mocha.Func) => {
        socketClient1.emit("foundDifference", GameMode.Solo);
        const expected: string = "Différence trouvée.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message if an error identification occured in solo mode", (done: Mocha.Func) => {
        socketClient1.emit("errorIdentification", GameMode.Solo);
        const expected: string = "Erreur.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should not send a foundDifference message to all users if a new user has no username", (done: Mocha.Func) => {
        socketClient2.emit("foundDifference");
        const expected: boolean = false;
        let receivedMessage: boolean = false;
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            receivedMessage = true;
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                receivedMessage = true;
            });
        });
        const TWO_SEC: number = 2000;
        setTimeout(
            () => {
                expect(expected).to.be.equal(receivedMessage);
                setTimeout(done, 0);
            },
            TWO_SEC,
        );
    });

    it("should send a message to all users if a user is disconnected", (done: Mocha.Func) => {
        socketClient1.disconnect();
        const expected: string = "Username1 vient de se déconnecter.";
        socketClient2.on("chatMessage", (result: ChatMessage) => {
            expect(decodeURIComponent(escape(result.text))).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message to all users if a best time solo is beaten", (done: Mocha.Func) => {
        const username: string = "username";
        const position: number = 2;
        const gameName: string = "Voiture";
        const gameMode: GameMode = GameMode.Solo;
        ChatMessageService.sendBestTimeMessage(username, position, gameName, gameMode);
        const expected: string = `${username} obtient la deuxième place dans les meilleurs temps du jeu ${gameName} en solo`;
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            expect(decodeURIComponent(escape(result1.text))).to.deep.equals(expected);
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                expect(decodeURIComponent(escape(result2.text))).to.deep.equals(expected);
                setTimeout(done, 0);
            });
        });
    });

    it("should send a message to all users if a best time pvp is beaten", (done: Mocha.Func) => {
        const username: string = "username";
        const position: number = 2;
        const gameName: string = "Voiture";
        const gameMode: GameMode = GameMode.Pvp;
        ChatMessageService.sendBestTimeMessage(username, position, gameName, gameMode);
        const expected: string = `${username} obtient la deuxième place dans les meilleurs temps du jeu ${gameName} en un contre un`;
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            expect(decodeURIComponent(escape(result1.text))).to.deep.equals(expected);
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                expect(decodeURIComponent(escape(result2.text))).to.deep.equals(expected);
                setTimeout(done, 0);
            });
        });
    });

    it("should send a message if a difference is found in pvp mode", (done: Mocha.Func) => {
        socketClient1.emit("errorIdentification", GameType.Free);
        const expected: string = "Erreur par Username1.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });

    it("should send a message if an error identification occured in pvp mode", (done: Mocha.Func) => {
        socketClient1.emit("foundDifference", GameType.Free);
        const expected: string = "Différence trouvée par Username1.";
        socketClient1.on("chatMessage", (result: ChatMessage) => {
            expect(result.text).to.deep.equals(expected);
            setTimeout(done, 0);
        });
    });
});
