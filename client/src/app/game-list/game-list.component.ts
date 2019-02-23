import { Component, Input } from "@angular/core";
import { GameSheet } from "../../../../common/communication/game-description";
// @ts-ignore
import { GameListService } from "../game-list-getter.service";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"],
})
export class GameListComponent {

    @Input() public is3D: boolean;
    @Input() public descriptions: GameSheet[];
    @Input() public isAdmin: boolean = false;

}
