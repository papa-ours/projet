import { inject, injectable } from "inversify";
import "reflect-metadata";
import { GameMode, GameSheet, GameType, HasId } from "../../../common/communication/game-description";
import { container } from "../inversify.config";
import { Socket } from "../socket";
import Types from "../types";
import { DBConnectionService } from "./db-connection.service";
import { FreeGame } from "./game/free-game";
import { AbstractGame } from "./game/game";
import { SimpleGame } from "./game/simple-game";
import { WaitingRoom } from "./game/waiting-room";
import { UsersContainerService } from "./users-container.service";

@injectable()
export class GetGameService {

    private static readonly games: AbstractGame[] = [];
    private static readonly gameSheets: [GameSheet[], GameSheet[]] = [[], []];
    private static readonly waitingRooms: [WaitingRoom[], WaitingRoom[]] = [[], []];

    public constructor(
        @inject(Types.DBConnectionService) private dbConnectionService: DBConnectionService,
    ) {

    }

    public addGameSheet(gameSheet: GameSheet, type: GameType): void {
        gameSheet.id = this.generateUniqueId(GetGameService.gameSheets[type]);
        GetGameService.gameSheets[type].push(gameSheet);
    }

    public getGameIndex(id: string): number {
        return GetGameService.games.findIndex((currentGame: AbstractGame) => {
            return currentGame.id === id;
        });
    }

    public getGame(id: string): AbstractGame {
        const index: number = this.getGameIndex(id);

        if (index === -1) {
            throw new RangeError("Aucune Game n'a le id " + id);
        }

        return GetGameService.games[index];
    }

    public async getSheetId(name: string, type: GameType): Promise<string> {
        return this.dbConnectionService.getGameSheetId(name, type);
    }

    public async createGame(name: string, type: GameType, username: string): Promise<string> {
        const id: string = this.generateUniqueId(GetGameService.games);
        const sheetId: string = await this.getSheetId(name, type);
        // triple equal problem
        // tslint:disable-next-line:triple-equals
        const game: AbstractGame = type == GameType.Free ?
                            await FreeGame.create(id, sheetId, GameMode.Solo, name) :
                            await SimpleGame.create(id, sheetId, GameMode.Solo, name);
        if (game) {
            GetGameService.games.push(game);
            game.start(username);
        }

        return new Promise<string>((resolve: Function) => resolve(id));
    }

    public createWaitingRoom(name: string, username: string, type: GameType): void {
        this.getSheetId(name, type)
        .then((id: string) => {
            Socket.io.emit(`GameCreated-${id}`, true);
            GetGameService.waitingRooms[type]
                .push(new WaitingRoom(id, username, type, container.get<UsersContainerService>(Types.UsersContainerService)));
        })
        .catch((error: Error) => console.error(error.message));
    }

    public joinWaitingRoom(name: string, username: string, type: GameType): void {
        this.getSheetId(name, type)
        .then((id: string) => {
            const waitingRoom: WaitingRoom | undefined = GetGameService.waitingRooms[type].find((currentWaitingRoom: WaitingRoom) => {
                return currentWaitingRoom.gameSheetId === id && currentWaitingRoom.usernames[0] === username;
            });

            if (waitingRoom) {
                waitingRoom.addUser(username);
            }
        })
        .catch((error: Error) => console.error(error.message));
    }

    public deleteWaitingRoom(name: string, username: string, type: GameType): void {
        this.getSheetId(name, type)
        .then((id: string) => {
            const index: number = GetGameService.waitingRooms[type].findIndex((waitingRoom: WaitingRoom) => {
                return waitingRoom.gameSheetId === id && waitingRoom.usernames[0] === username;
            });

            if (index !== -1) {
                Socket.io.emit(`GameCreated-${id}`, false);
                GetGameService.waitingRooms[type].splice(index, 1);
            }
        })
        .catch((error: Error) => console.error(error.message));
    }

    public async removeGame(id: string): Promise<{}> {
        const index: number = this.getGameIndex(id);
        const game: AbstractGame = GetGameService.games.splice(index, 1)[0];

        return game.cleanUp();
    }

    private generateId(): string {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const ID_LENGTH: number = 25;
        const id: string[] = [...Array(ID_LENGTH)].map(() => {
            const index: number = Math.floor(Math.random() * POSSIBLE_VALUES.length);

            return POSSIBLE_VALUES.charAt(index);
        });

        return id.join("");
    }

    private isIdTaken(list: HasId[], id: string): boolean {
        const objectWithId: HasId | undefined = list.find((value: HasId) => {
            return value.id === id;
        });

        return objectWithId !== undefined;
    }

    private generateUniqueId(list: HasId[]): string {
        let id: string;

        do {
            id = this.generateId();
        } while (this.isIdTaken(list, id));

        return id;
    }

    public emptyGames(): void {
        GetGameService.games.splice(0, GetGameService.length);
    }
}
