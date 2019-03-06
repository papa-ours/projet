import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, GameType, HasId } from "../../../common/communication/game-description";
import { Game } from "./game";
import { TopScores } from "./score/top-scores";

@injectable()
export class GetGameService {

    private static readonly games: Game[] = [];
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

    public getGame(id: string): Game {
        const game: Game | undefined = GetGameService.games.find((currentGame: Game) => {
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
        const game: Game = new Game(id, name, type);
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
        const index: number = GetGameService.gameSheets[type].indexOf(gameSheet);

        GetGameService.gameSheets[type].splice(index, 1);
    }

    private generateTopScores(): TopScores[] {
        const TOP_SCORES_LENGTH: number = 2;

        return [...Array(TOP_SCORES_LENGTH)].map(() => {

            return new TopScores();
        });
    }

    public reinitializeScores(id: string, type: GameType): void {
        const gameSheet: GameSheet = this.getGameSheet(id, type);
        gameSheet.topScores = this.generateTopScores();
    }

    public emptyGameSheets(): void {
        GetGameService.gameSheets[0] = [];
        GetGameService.gameSheets[1] = [];
    }

    public emptyGames(): void {
        GetGameService.games.splice(0, GetGameService.length);
    }
}
