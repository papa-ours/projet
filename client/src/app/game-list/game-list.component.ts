import { Component, OnInit } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service"

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  
  //@ts-ignore
  private descriptions: GameSheetDescription[];

  constructor(private gameListService: GameListService) { }

  ngOnInit() {
    this.gameListService.getGameList().subscribe(descriptions => this.descriptions = descriptions);
  }

}
