import { injectable } from "inversify";
import "reflect-metadata";
import { GameSheetDescription, GameSheet } from "../../../common/communication/game-description";
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

    public getGameDescriptions(): GameSheetDescription[] {
        return GetGameService.gameSheets;
    }
}
