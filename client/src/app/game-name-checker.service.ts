import { Injectable } from "@angular/core";
import { GameType } from "../../../common/communication/game-description";
import { GetGameService } from "../../../server/app/services/get-game.service";
@Injectable({
    providedIn: "root",
})
export class GameNameChecker {

    public constructor(private getGameService: GetGameService) { }

    public async checkName(name: string, type: GameType): Promise<boolean> {

        const id: string = await this.getGameService.getSheetId(name, type);

        return id !== undefined;
    }
}
