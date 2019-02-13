import { Component, Input } from "@angular/core";
import { GameSheetDescription } from "../../../../common/communication/game-description";
// @ts-ignore
import { GameListService } from "../game-list-getter.service";
import { Privilege } from "../privilege";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"],
})
export class GameListComponent {

    @Input() public is3D: boolean;
    @Input() public descriptions: GameSheetDescription[];
    @Input() public privilege: Privilege;

}
