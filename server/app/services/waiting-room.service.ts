import Axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameType } from "../../../common/communication/game-description";
import { Socket } from "../socket";
import { WaitingRoom } from "./game/waiting-room";

@injectable()
export class WaitingRoomService {
    public static readonly waitingRooms: [WaitingRoom[], WaitingRoom[]] = [[], []];

    public async createWaitingRoom(name: string, username: string, type: GameType): Promise<void> {
        return this.getSheetId(name, type)
            .then((id: string) => {
                Socket.io.emit(`GameCreated-${id}`, true);
                WaitingRoomService.waitingRooms[type]
                    .push(new WaitingRoom(id, name, username, type));
            });
    }

    public async joinWaitingRoom(name: string, username: string, type: GameType): Promise<void> {
        return this.getSheetId(name, type)
            .then((id: string) => {
                const waitingRoom: WaitingRoom | undefined = WaitingRoomService.waitingRooms[type]
                    .find((currentWaitingRoom: WaitingRoom) => {
                        return currentWaitingRoom.gameSheetId === id;
                    });

                if (waitingRoom) {
                    waitingRoom.addUser(username);
                }
            });
    }

    public deleteWaitingRoom(name: string, username: string, type: GameType): void {
        this.getSheetId(name, type)
            .then((id: string) => {
                const index: number = WaitingRoomService.waitingRooms[type].findIndex((waitingRoom: WaitingRoom) => {
                    return waitingRoom.gameSheetId === id && waitingRoom.usernames[0] === username;
                });

                if (index !== -1) {
                    Socket.io.emit(`GameCreated-${id}`, false);
                    WaitingRoomService.waitingRooms[type].splice(index, 1);
                }
            })
            .catch((error: Error) => console.error(error.message));
    }

    public deleteAllWaitingRooms(username: string): void {
        WaitingRoomService.waitingRooms.forEach((waitingRoomList: WaitingRoom[], type: number) => {
            waitingRoomList.forEach((waitingRoom: WaitingRoom) => {
                if (waitingRoom.usernames[0] === username) {
                    this.deleteWaitingRoom(waitingRoom.name, username, type);
                }
            });
        });
    }

    private async getSheetId(name: string, type: GameType): Promise<string> {
        return (await Axios.get(`${SERVER_ADDRESS}/api/game/sheet/id/${name}/${type}`)).data.body;
    }
}
