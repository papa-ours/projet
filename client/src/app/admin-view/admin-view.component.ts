import { Component } from '@angular/core';
import { Privilege } from "../privilege";
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service";

enum GameType {
  Simple,
  Free,
}

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})

export class AdminViewComponent {

  Privilege = Privilege;
  showForm2D:boolean=false;
  showForm3D:boolean=false;

  private games: GameSheetDescription[][] = [];

  public constructor(private gameListService: GameListService) { 
  }

  public ngOnInit(): void {
    this.gameListService.getGameList().subscribe((lists) => {
      this.games[GameType.Simple] = lists.list2d;
      this.games[GameType.Free] = lists.list3d;
    });
  }

}
