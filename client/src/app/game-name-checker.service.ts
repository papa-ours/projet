import { Injectable } from "@angular/core";
import { GameType } from "../../../common/communication/game-description";
import { GameListService } from "./game-list-getter.service";
@Injectable({
    providedIn: "root",
})
export class GameNameCheckerService {

    private names: string[];
    public constructor(private gameListService: GameListService) {  }

    public initialize(): void {
    }
    public checkName(name: string, type: GameType): boolean {

        return false;
    }
}
