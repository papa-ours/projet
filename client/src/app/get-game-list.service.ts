import { Injectable } from '@angular/core';
import { GameSheetDescription } from '../../../common/communication/game-description';

@Injectable({
  providedIn: 'root'
})
export class GetGameListService {

  constructor() { }


  public getGameList(): GameSheetDescription[] {
    const placeholder: GameSheetDescription = {
      name: "Placeholder",
      preview: "../../assets/preview-placeholder.png",
      topScores1v1: ["3:51 Username", "3:51 Username", "3:51 Username"],
      topScoresSolo: ["3:51 Username", "3:51 Username", "3:51 Username"],
    };

    return [placeholder, placeholder, placeholder];
  }
}
