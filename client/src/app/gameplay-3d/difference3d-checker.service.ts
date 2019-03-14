import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { Message } from "../../../../common/communication/message";
import { VectorInterface } from "../../../../common/communication/vector-interface";

@Injectable({
    providedIn: "root",
})
export class Difference3DCheckerService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/difference/3D`;
    public constructor(private http: HttpClient) { }

    public isPositionDifference(position: VectorInterface, name: string): Observable<boolean> {
        const type: GameType = GameType.Free;

        return this.http.post<Message>(this.URL, { position, name, type })
            .pipe(map((message: Message) => JSON.parse(message.body)),
            );
    }
}
