import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable({
  providedIn: "root",
})

export class GameplayService {

    public readonly URL: string = "http://localhost:3000/api/gamplaySimplePOV/";
    public constructor(private http: HttpClient) { }

    public getGameplayImages(gameSheetId: string): Observable<Message> {
        return this.http.get<Message>(this.URL + gameSheetId)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }
}
