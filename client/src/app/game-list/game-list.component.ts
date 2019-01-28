import { Component, OnInit, Input } from '@angular/core';
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
  @Input() private is2D: boolean;
  //@ts-ignore
  @Input() private privilege: "admin" | "user";
  constructor(private gameListService: GameListService) { }

  ngOnInit() {
    this.gameListService.getGameList().subscribe(lists => this.descriptions = this.is2D ? lists.list2d : lists.list3d);
  }

}
