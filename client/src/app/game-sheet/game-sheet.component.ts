import { Component, OnInit } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css']
})
export class GameSheetComponent implements OnInit {

  private description: GameSheetDescription;

  public constructor() {
    this.description = {
      name: "Placeholder",
      preview: "../../assets/preview-placeholder.png",
      topScores1v1: ["3:51 Username", "3:51 Username", "3:51 Username"],
      topScoresSolo: ["3:51 Username", "3:51 Username", "3:51 Username"],
    };
  }

  ngOnInit() {
  }

}
