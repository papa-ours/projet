import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheet, GameSheetDescription } from "../../../common/communication/game-description";
import { Game } from "./game";

@injectable()
export class GetGameService {

    private static games: Game[] = [];
    private static gameSheets: GameSheet[] = [];

    public addGame(gameSheet: GameSheetDescription, game: Game): void {
        GetGameService.games.push(game);
        GetGameService.gameSheets.push(gameSheet);
    }

    public addGameSheet(gameSheet: GameSheet): void {
        GetGameService.gameSheets.push(gameSheet);
    }

    public getGame(id: string): Game | undefined {
        return GetGameService.games.find((game: Game) => {
            return game.id === id;
        });
    }

    public getGameImages(id: string): string[] {
        const game: Game | undefined = this.getGame(id);

        return game ? [ game.originalImage.toArray().toString(),
                        game.modifiedImage.toArray().toString(),
                        game.differenceImage.toArray().toString()]
                        : [];
    }

    public getGameDescriptions(): GameSheet[] {
        return GetGameService.gameSheets;
    }

    public createGame(name: string): string {
        return this.generateId();
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
