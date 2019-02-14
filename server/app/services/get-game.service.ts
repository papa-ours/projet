import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheet } from "../../../common/communication/game-description";
import { Game } from "./game";

@injectable()
export class GetGameService {

    private static games: Game[] = [];
    private static gameSheets: GameSheet[] = [];

    public addGameSheet(gameSheet: GameSheet): void {
        let id: string = this.generateId();
        while (this.getGame(id)) {
            id = this.generateId();
        }
        gameSheet.id = id;
        GetGameService.gameSheets.push(gameSheet);
    }

    public getGameSheet(id: string): GameSheet | undefined {
        return GetGameService.gameSheets.find((gameSheet: GameSheet) => {
            return gameSheet.id === id;
        });
    }

    public getGame(id: string): Game | undefined {
        return GetGameService.games.find((game: Game) => {
            return game.id === id;
        });
    }

    public getGameDescriptions(): GameSheet[] {
        return GetGameService.gameSheets;
    }

    public createGame(name: string): string {
        let id: string = this.generateId();
        while (this.getGame(id)) {
            id = this.generateId();
        }

        const game: Game = new Game(id, name);
        GetGameService.games.push(game);

        return id;
    }

    private generateId(): string {
        const POSSIBLE_VALUES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const ID_LENGTH: number = 25;
        const id: string[] = [...Array(ID_LENGTH)].map(() => {
            const index: number = Math.floor(Math.random() * POSSIBLE_VALUES.length - 1);

            return POSSIBLE_VALUES.charAt(index);
        });

        return id.join("");
    }
}
