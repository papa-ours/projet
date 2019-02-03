import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service";

enum GameType {
  Simple,
  Free,
}

@Component({
  selector: 'app-game-list-view',
  templateUrl: './game-list-view.component.html',
  styleUrls: ['./game-list-view.component.css']
})

export class GameListViewComponent implements OnInit {

  // @ts-ignore
  private username: string = "";
  private games: GameSheetDescription[][] = [];

  public constructor(private route: ActivatedRoute,
                     private gameListService: GameListService) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params["username"];
    });

    this.gameListService.getGameList().subscribe((lists) => {
      this.games[GameType.Simple] = lists.list2d;
      this.games[GameType.Free] = lists.list3d;
    });
  }

}
