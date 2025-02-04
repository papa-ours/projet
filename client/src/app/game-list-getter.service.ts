import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameLists } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class GameListService {

    private readonly BASE_URL: string = `${SERVER_ADDRESS}/api/gamelist/`;
    public constructor(private http: HttpClient) { }

    public getGameList(): Observable<GameLists> {
        return this.http.get<Message>(this.BASE_URL)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }
}
