import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { GameType } from "../../../common/communication/game-description";
import { Message } from "../../../common/communication/message";

@Injectable({
  providedIn: "root",
})

export class GameplayService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/game`;
    public constructor(private http: HttpClient) { }

    public getGameId(name: string, type: GameType, username: string): Observable<string> {
        return this.http.get<Message>(`${this.URL}/${name}/${type}/${username}`)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    public createWaitingRoom(name: string, type: GameType, username: string): Observable<string> {
        return this.http.post<Message>(`${this.URL}/waitingRoom/create/`, {name: name, type: type, username: username})
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    public deleteWaitingRoom(name: string, type: GameType, username: string): Observable<void> {
        return this.http.delete<void>(`${this.URL}/waitingRoom/${name}/${username}/${type}`);
    }
}
