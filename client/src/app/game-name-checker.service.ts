import { Injectable } from "@angular/core";
import { GameType, GameSheet } from "../../../common/communication/game-description";
import { GameListService } from "./game-list-getter.service";
@Injectable({
    providedIn: "root",
})
export class GameNameCheckerService {

    private names: string[];
    public constructor(private gameListService: GameListService) {  }

    public initialize(type: GameType): void {
        this.names = [];
        
        this.gameListService.getGameList().subscribe((lists) => {
            const listNames: GameSheet[] = type === GameType.Simple ? lists.list2d : lists.list3d;
            for (const game3d of listNames) {
                this.names.push(game3d.name);
            }
        });
    }
    public checkName(name: string, gameType: GameType): boolean {
        for (const nameGame of this.names) {
            if (name === nameGame) {
                return true;
            }
        }

        return false;
    }
}
