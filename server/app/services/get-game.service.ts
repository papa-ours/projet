import { injectable } from "inversify";
import "reflect-metadata";
import { GameType, HasId } from "../../../common/communication/game-description";
import { FreeGame } from "./game/free-game";
import { AbstractGame } from "./game/game";
import { SimpleGame } from "./game/simple-game";

@injectable()
export class GetGameService {

    private static readonly games: AbstractGame[] = [];

    public getGame(id: string): AbstractGame {
        const game: AbstractGame | undefined = GetGameService.games.find((currentGame: AbstractGame) => {
            return currentGame.id === id;
        });

        if (!game) {
            throw new RangeError("Aucune Game n'a le id " + id);
        }

        return game;
    }

    public async createGame(name: string, type: GameType): Promise<string> {
        const id: string = this.generateUniqueId(GetGameService.games);
        // triple equal problem
        // tslint:disable-next-line:triple-equals
        const game: AbstractGame | void = type == GameType.Free ?
                            await FreeGame.create(id, name).catch((error: Error) => console.error(error.message)) :
                            await SimpleGame.create(id, name).catch((error: Error) => console.error(error.message));

        if (game) {
            GetGameService.games.push(game);
        }

        return new Promise<string>((resolve: Function) => resolve(id));
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
