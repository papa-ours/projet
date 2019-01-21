import { Component, Input, OnInit } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css']
})
export class GameSheetComponent implements OnInit {

  @Input() private description: GameSheetDescription;

  public constructor() {
  }

  ngOnInit() {
  }

}
