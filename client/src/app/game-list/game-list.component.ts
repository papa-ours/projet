import { Component, Input, OnInit } from "@angular/core";
import { GameSheetDescription, Privilege } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"],
})
export class GameListComponent implements OnInit {

  // @ts-ignore
  private descriptions: GameSheetDescription[];
  @Input() private is2D: boolean;
  // @ts-ignore
  @Input() private privilege: Privilege;
  public constructor(private gameListService: GameListService) { }

  public ngOnInit(): void {
    this.gameListService.getGameList().subscribe((lists) => this.descriptions = this.is2D ? lists.list2d : lists.list3d);
  }

}
