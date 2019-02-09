import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheetDescription } from "../../../common/communication/game-description";
import { Game } from "./game-sheet";

@injectable()
export class GetGameService {

    private static games: Game[] = [];

    public addGame(game: Game): void {
        GetGameService.games.push(game);
    }

    public getGame(id: string): Game | undefined {
        return GetGameService.games.find((game: Game) => {
            return game.id === id;
        });
    }

    public getGameDescriptions(): GameSheetDescription[] {
        return GetGameService.games.map((game: Game) => {
            return game as GameSheetDescription;
        });
    }
}
