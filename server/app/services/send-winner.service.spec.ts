import Axios, { AxiosResponse } from "axios";
import { expect } from "chai";
import * as io from "socket.io-client";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameMode, GameType } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";
import { Position } from "../../../common/images/position";
import { container } from "../inversify.config";
import { Server } from "../server";
import { Socket } from "../socket";
import Types from "../types";
import { AbstractGame } from "./game/game";
import { GetGameService } from "./get-game.service";
import { UsersContainerService } from "./users-container.service";

const server: Server = container.get<Server>(Types.Server);

before(() => {
    server.init();
    const socket: Socket = container.get<Socket>(Types.Socket);
    socket.init(server.getServer());
});

after((done: Mocha.Done) => {
    Socket.io.close();
    server.getServer().close();
    done();
});

// tslint:disable-next-line:max-func-body-length
describe("send-winner.service", () => {
    const getGameService: GetGameService = container.get<GetGameService>(Types.GetGameService);
    const userContainerService: UsersContainerService = container.get<UsersContainerService>(Types.UsersContainerService);
    const username1: string = "Username1";
    const username2: string = "Username2";
    let socketClient1: SocketIOClient.Socket;
    let socketClient2: SocketIOClient.Socket;

    beforeEach((done: Mocha.Done) => {
        socketClient1 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });
        socketClient1.on("connect", () => {
            userContainerService.addUser({name: username1, socketId: socketClient1.id});

            socketClient2 = io.connect(SERVER_ADDRESS, { forceNew: true, reconnectionDelay: 0 });

            socketClient2.on("connect", () => {
                userContainerService.addUser({name: username2, socketId: socketClient2.id});
                done();
            });
        });
    });

    afterEach((done: Mocha.Done) => {
        socketClient1.disconnect();
        socketClient2.disconnect();
        done();
    });

    it("should send the winner in solo mode", (done: Mocha.Done) => {
        socketClient1.on("endGameWinner", (winner: string) => {
            expect(winner).to.equal(username1);
            done();
        });
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Solo}/${JSON.stringify([username1])}`)
        .then((response: AxiosResponse<Message>) => {
            const gameId: string = JSON.parse(response.data.body);
            const game: AbstractGame = getGameService.getGame(gameId);
            const positions: Position[] = [{i: 480, j: 171}, {i: 477, j: 234}, {i: 254, j: 145}, {i: 33, j: 192},
                                           {i: 468, j: 335}, {i: 222, j: 262}, {i: 343, j: 158}];
            Promise.all(positions.map((position: Position) =>
                Axios.get(`${SERVER_ADDRESS}/api/difference/${game.id}/${position.i}/${position.j}/${username1}`)));
        });
    });

    it("should send the winner to both players in pvp", (done: Mocha.Done) => {
        socketClient1.on("endGameWinner", (winner1: string) => {
            expect(winner1).to.equal(username1);
            socketClient1.on("endGameWinner", (winner2: string) => {
                expect(winner2).to.equal(username1);
                done();
            });
        });
        Axios.get(`${SERVER_ADDRESS}/api/game/id/voiture/${GameType.Simple}/${GameMode.Pvp}/${JSON.stringify(["Username1", "Username2"])}`)
        .then((response: AxiosResponse<Message>) => {
            const gameId: string = JSON.parse(response.data.body);
            const game: AbstractGame = getGameService.getGame(gameId);
            const userSocket1: SocketIO.Socket | undefined = Socket.getSocket(socketClient1.id);
            const userSocket2: SocketIO.Socket | undefined = Socket.getSocket(socketClient2.id);
            if (userSocket1 && userSocket2) {
                userSocket1.join(`${game.sheetId}-Username1`);
                userSocket2.join(`${game.sheetId}-Username1`);
                const positions: Position[] = [{i: 480, j: 171}, {i: 477, j: 234}, {i: 254, j: 145}, {i: 33, j: 192}];
                Promise.all(positions.map((position: Position) =>
                    Axios.get(`${SERVER_ADDRESS}/api/difference/${game.id}/${position.i}/${position.j}/${username1}`)));
            }
        });
    });
});
