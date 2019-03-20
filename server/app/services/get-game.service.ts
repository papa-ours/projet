import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, GameType, HasId } from "../../../common/communication/game-description";
import { FreeGame } from "./game/free-game";
import { AbstractGame } from "./game/game";
import { SimpleGame } from "./game/simple-game";
import { TopScores } from "./score/top-scores";

@injectable()
export class GetGameService {

    private static readonly games: AbstractGame[] = [];
    private static readonly gameSheets: [GameSheet[], GameSheet[]] = [[], []];

    public addGameSheet(gameSheet: GameSheet, type: GameType): void {
        gameSheet.id = this.generateUniqueId(GetGameService.gameSheets[type]);
        GetGameService.gameSheets[type].push(gameSheet);
    }

    public getGameSheet(id: string, type: GameType): GameSheet {
        const gameSheet: GameSheet | undefined = GetGameService.gameSheets[type].find((sheet: GameSheet) => {
            return sheet.id === id;
        });

        if (!gameSheet) {
            throw new RangeError("Aucune GameSheet n'a le id " + id);
        }

        return gameSheet;
    }

    public getGame(id: string): AbstractGame {
        const game: AbstractGame | undefined = GetGameService.games.find((currentGame: AbstractGame) => {
            return currentGame.id === id;
        });

        if (!game) {
            throw new RangeError("Aucune Game n'a le id " + id);
        }

        return game;
    }

    public getGameDescriptions(type: GameType): GameSheet[] {
        return GetGameService.gameSheets[type];
    }

    public createGame(name: string, type: GameType): string {
        const id: string = this.generateUniqueId(GetGameService.games);
        // triple equal problem
        // tslint:disable-next-line:triple-equals
        const game: AbstractGame = type == GameType.Free ? new FreeGame(id, name, type) : new SimpleGame(id, name, type);
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

    public deleteGameSheet(id: string, type: GameType): void {
        const gameSheet: GameSheet = this.getGameSheet(id, type);
        const index: number = GetGameService.gameSheets[type].findIndex((currentGameSheet: GameSheet) => {
            return currentGameSheet === gameSheet;
        });

        if (index !== -1) {
            GetGameService.gameSheets[type].splice(index, 1);
        }
    }

    public reinitializeScores(id: string, type: GameType): void {
        const gameSheet: GameSheet = this.getGameSheet(id, type);
        gameSheet.topScores = gameSheet.topScores.map(() => {
            return new TopScores();
        });
    }

    public emptyGameSheets(): void {
        GetGameService.gameSheets[GameType.Simple] = [];
        GetGameService.gameSheets[GameType.Free] = [];
    }

    public emptyGames(): void {
        GetGameService.games.splice(0, GetGameService.length);
    }
}
