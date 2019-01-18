import { Component, OnInit } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private description: GameSheetDescription = GameListComponent.getDesc();

  private static getDesc: () => GameSheetDescription[] = () => {
    const placeholder: GameSheetDescription = {
      name: "Placeholder",
      preview: "../../assets/preview-placeholder.png",
      topScores1v1: ["3:51 Username", "3:51 Username", "3:51 Username"],
      topScoresSolo: ["3:51 Username", "3:51 Username", "3:51 Username"],
    };

    return [placeholder, placeholder, placeholder];
  }

  constructor() { }

  ngOnInit() {
  }

}
