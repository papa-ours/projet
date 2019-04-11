import { Injectable } from "@angular/core";
import { GameType } from "../../../common/communication/game-description";
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
            for (const game3d of lists.list3d) {
                this.names.push(game3d.name);
            }
        });
    }
    public checkName(name: string): boolean {
        for (const nameGame of this.names) {
            if (name === nameGame) {
                return true;
            }
        }

        return false;
    }
}
