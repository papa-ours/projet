import { Injectable } from "@angular/core";
import { GetGameService } from "../../../server/app/services/get-game.service";
@Injectable({
    providedIn: "root",
})
export class GameNameChecker {

    public constructor(private getGameService: GetGameService) { }


        return false;
    }
}