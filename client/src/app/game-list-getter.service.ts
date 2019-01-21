import { Injectable } from '@angular/core';
import { GameLists } from '../../../common/communication/game-description';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Message } from "../../../common/communication/message";

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  private readonly BASE_URL: string = "http://localhost:3000/gameList/";
  public constructor(private http: HttpClient) { }

  public getGameList(): Observable<GameLists> {
      return this.http.get<Message>(this.BASE_URL)
          .pipe(map(message => JSON.parse(message.body))
      );
  }
}
