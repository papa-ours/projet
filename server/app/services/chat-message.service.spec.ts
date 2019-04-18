import Axios, { AxiosResponse } from "axios";
import { expect } from "chai";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode, GameType } from "../../../common/communication/game-description";
import { ChatMessage, Message } from "../../../common/communication/message";
import { container } from "../inversify.config";
import { Server } from "../server";
import { Socket } from "../socket";
import Types from "../types";
import { ChatMessageService } from "./chat-message.service";
import { AbstractGame } from "./game/game";
import { GetGameService } from "./get-game.service";
import { UsersContainerService } from "./users-container.service";

describe("chat-message-service", () => {
    const getGameService: GetGameService = container.get<GetGameService>(Types.GetGameService);
    const userContainerService: UsersContainerService = container.get<UsersContainerService>(Types.UsersContainerService);
    const chatMessageService: ChatMessageService = container.get<ChatMessageService>(Types.ChatMessageService);
    const username1: string = "Username1";
    const username2: string = "Username2";
    let socketClient1: SocketIOClient.Socket;
    let socketClient2: SocketIOClient.Socket;

    const server: Server = container.get<Server>(Types.Server);
    const socket: Socket = container.get<Socket>(Types.Socket);

    before(() => {
        server.init();
        socket.init(server.getServer());
    });

    after((done: Mocha.Done) => {
        Socket.io.close();
        server.getServer().close();
        done();
    });

    beforeEach((done: Mocha.Done) => {
        socketClient1 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });
        socketClient1.on("connect", () => {
            userContainerService.addUser({name: username1, socketId: socketClient1.id});

            socketClient2 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });

            socketClient2.on("connect", () => {
                done();
            });
        });
    });

    afterEach((done: Mocha.Done) => {
        socketClient1.disconnect();
        socketClient2.disconnect();
        done();
    });

    it("should send a message to all users if a new user is connected", (done: Mocha.Done) => {
        socketClient1.emit("newUser");
        const expected: string = username1 + " vient de se connecter.";
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            expect(result1.text).to.deep.equals(expected);
            socketClient2.on("chatMessage", (result2: ChatMessage) => {
                expect(result2.text).to.deep.equals(expected);
                done();
            });
        });
    });

    it("should not send a connection message to all users if a new user has no username", (done: Mocha.Done) => {
        socketClient2.emit("newUser");
        const expected: boolean = false;
        let receivedMessage: boolean = false;
        socketClient1.on("chatMessage", (result1: ChatMessage) => {
            receivedMessage = true;
        });

        socketClient2.on("chatMessage", (result2: ChatMessage) => {
            receivedMessage = true;
        });

        const TWO_SEC: number = 2000;
        setTimeout(
            () => {
                expect(receivedMessage).to.be.equal(expected);
                done();
            },
            TWO_SEC,
        );
    });

    it("should send a message if a difference is found in solo mode", (done: Mocha.Done) => {
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Solo}/${JSON.stringify([username1])}`)
            .then((response: AxiosResponse<Message>) => {
                socketClient1.emit("foundDifference", JSON.parse(response.data.body), GameMode.Solo);
                const expected: string = "Différence trouvée.";
                socketClient1.on("chatMessage", (result: ChatMessage) => {
                    expect(result.text).to.deep.equals(expected);
                    done();
                });
            })
            .catch((error: Error) => console.error(error.message));
    });

    it("should send a message if an error identification occured in solo mode", (done: Mocha.Done) => {
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Solo}/${JSON.stringify([username1])}`)
            .then((response: AxiosResponse<Message>) => {
                socketClient1.emit("errorIdentification", JSON.parse(response.data.body), GameMode.Solo);
                const expected: string = "Erreur.";
                socketClient1.on("chatMessage", (result: ChatMessage) => {
                    expect(result.text).to.deep.equals(expected);
                    done();
                });
            })
            .catch((error: Error) => console.error(error.message));
    });

    it("should send a message to all users if a user is disconnected", (done: Mocha.Done) => {
        socketClient1.disconnect();
        const expected: string = "Username1 vient de se déconnecter.";
        socketClient2.on("chatMessage", (data: ChatMessage) => {
            const result: string = data.text.replace("Ã©", "é");
            expect(result).to.deep.equals(expected);
            done();
        });
    });

    it("should send a message to all users if a best time solo is beaten", (done: Mocha.Done) => {
        const username: string = "username";
        const positionIndex: number = 1;
        const gameName: string = "Voiture";
        const gameMode: GameMode = GameMode.Solo;
        chatMessageService.sendBestTimeMessage(username, positionIndex, gameName, gameMode);
        const expected: string = `username obtient la deuxième place dans les meilleurs temps du jeu Voiture en solo`;
        socketClient1.on("chatMessage", (data1: ChatMessage) => {
            const result1: string = data1.text.replace("Ã¨", "è");
            expect(result1).to.deep.equals(expected);
            socketClient2.on("chatMessage", (data2: ChatMessage) => {
                const result2: string = data2.text.replace("Ã¨", "è");
                expect(result2).to.deep.equals(expected);
                done();
            });
        });
    });

    it("should send a message to all users if a best time pvp is beaten", (done: Mocha.Done) => {
        const username: string = "username";
        const positionIndex: number = 1;
        const gameName: string = "Voiture";
        const gameMode: GameMode = GameMode.Pvp;
        chatMessageService.sendBestTimeMessage(username, positionIndex, gameName, gameMode);
        const expected: string = `username obtient la deuxième place dans les meilleurs temps du jeu Voiture en un contre un`;
        socketClient1.on("chatMessage", (data1: ChatMessage) => {
            const result1: string = data1.text.replace("Ã¨", "è");
            expect(result1).to.deep.equals(expected);
            socketClient2.on("chatMessage", (data2: ChatMessage) => {
                const result2: string = data2.text.replace("Ã¨", "è");
                expect(result2).to.deep.equals(expected);
                done();
            });
        });
    });

    it("should send a message if a difference is found in pvp mode", (done: Mocha.Done) => {
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Pvp}/${JSON.stringify([username1, username2])}`)
            .then((response: AxiosResponse<Message>) => {
                const gameId: string = JSON.parse(response.data.body);
                const game: AbstractGame = getGameService.getGame(gameId);

                const userSocket: SocketIO.Socket | undefined = Socket.getSocket(socketClient1.id);
                if (userSocket) {
                    userSocket.join(`${game.sheetId}-Username1`);

                    socketClient1.emit("errorIdentification", gameId, GameMode.Pvp);
                    const expected: string = "Erreur par Username1.";
                    socketClient1.on("chatMessage", (result: ChatMessage) => {
                        expect(result.text).to.deep.equals(expected);
                        done();
                    });
                }
            })
            .catch((error: Error) => console.error(error.message));
    });

    it("should send a message if an error identification occured in pvp mode", (done: Mocha.Done) => {
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Pvp}/${JSON.stringify([username1, username2])}`)
            .then((response: AxiosResponse<Message>) => {
                const gameId: string = JSON.parse(response.data.body);
                const game: AbstractGame = getGameService.getGame(gameId);

                const userSocket: SocketIO.Socket | undefined = Socket.getSocket(socketClient1.id);
                if (userSocket) {
                    userSocket.join(`${game.sheetId}-Username1`);

                    socketClient1.emit("foundDifference", gameId, GameMode.Pvp);
                    const expected: string = "Différence trouvée par Username1.";
                    socketClient1.on("chatMessage", (result: ChatMessage) => {
                        expect(result.text).to.deep.equals(expected);
                        done();
                    });
                }
            })
            .catch((error: Error) => console.error(error.message));
    });
});
