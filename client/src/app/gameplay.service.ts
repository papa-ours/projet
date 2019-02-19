import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable({
  providedIn: "root",
})

export class GameplayService {

    public readonly URL: string = "http://132.207.12.131:5001/api/game/";
    public constructor(private http: HttpClient) { }

    public getGameId(name: string): Observable<string> {
        return this.http.get<Message>(this.URL + name)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }
}
