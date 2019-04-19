import { Injectable } from "@angular/core";
import { GameType } from "../../../common/communication/game-description";
import { GameListService } from "./game-list-getter.service";
@Injectable({
    providedIn: "root",
})
export class GameNameCheckerService {

    private names2d: string[];
    private names3d: string[];
    public constructor(private gameListService: GameListService) {  }

    public initialize(type: GameType): void {
        this.names2d = [];
        this.names3d = [];
        this.gameListService.getGameList().subscribe((lists) => {
            for (const game3d of lists.list3d) {
                this.names2d.push(game3d.name);
            }
            for (const game3d of lists.list2d) {
                this.names3d.push(game3d.name);
            }
        });
    }
    public checkName(name: string, gameType: GameType): boolean {
        const names: string[] = gameType === GameType.Simple ? this.names2d : this.names3d;
        for (const nameGame of names) {
            if (name === nameGame) {
                return true;
            }
        }

        return false;
    }
}
