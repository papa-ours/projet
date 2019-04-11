import { Injectable } from "@angular/core";
import { GameType } from "../../../common/communication/game-description";
import { GetGameService } from "../../../server/app/services/get-game.service";
@Injectable({
    providedIn: "root",
})
export class GameNameCheckerService {

    public constructor(private getGameService: GetGameService) { }

    public initialize(): void {
    }
    public checkName(name: string, type: GameType): boolean {

        return false;
    }
}
