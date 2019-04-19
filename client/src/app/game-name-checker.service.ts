import { Injectable } from "@angular/core";
import { GameSheet, GameType } from "../../../common/communication/game-description";
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
            listNames.forEach( (sheet) => {
                this.names.push(sheet.name);
        });
        });
    }
    public checkName(name: string): boolean {

        return this.names.indexOf(name) !== -1;
    }
}
