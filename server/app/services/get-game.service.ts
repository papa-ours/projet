import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, HasId } from "../../../common/communication/game-description";
import { Game } from "./game";

@injectable()
export class GetGameService {

    private static games: Game[] = [];
    private static gameSheets: GameSheet[] = [];

    public addGameSheet(gameSheet: GameSheet): void {
        gameSheet.id = this.generateUniqueId(GetGameService.gameSheets);
        GetGameService.gameSheets.push(gameSheet);
    }

    public getGameSheet(id: string): GameSheet {
        const gameSheet: GameSheet | undefined = GetGameService.gameSheets.find((sheet: GameSheet) => {
            return sheet.id === id;
        });

        if (!gameSheet) {
            throw new RangeError("Aucune GameSheet n'a le id " + id);
        }

        return gameSheet;
    }

    public getGame(id: string): Game {
        const game: Game | undefined = GetGameService.games.find((currentGame: Game) => {
            return currentGame.id === id;
        });

        if (!game) {
            throw new RangeError("Aucune Game n'a le id " + id);
        }

        return game;
    }

    public getGameDescriptions(): GameSheet[] {
        return GetGameService.gameSheets;
    }

    public createGame(name: string): string {
        const id: string = this.generateUniqueId(GetGameService.games);
        const game: Game = new Game(id, name);
        GetGameService.games.push(game);

        return id;
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

    public emptyGameSheets(): void {
        GetGameService.gameSheets = [];
    }

    public emptyGames(): void {
        GetGameService.games = [];
    }
}
