import { Component, OnInit } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListGetterService } from "../game-list-getter.service"

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private descriptions: GameSheetDescription[];

  constructor(private gameListGetter: GameListGetterService) { }

  ngOnInit() {
    this.gameListGetter.getGameList().subscribe(descriptions => this.descriptions = descriptions);
  }

}
