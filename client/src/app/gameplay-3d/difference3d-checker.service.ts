import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { GeometryData } from "../../../../common/communication/geometry";
import { Message } from "../../../../common/communication/message";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { ConnectionService } from "../connection.service";

@Injectable({
    providedIn: "root",
})
export class Difference3DCheckerService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/difference/3D`;
    public constructor(
        private http: HttpClient,
        private connectionService: ConnectionService,
        ) { }

    public isPositionDifference(position: VectorInterface, name: string): Observable<boolean> {
        const type: GameType = GameType.Free;

        return this.http.post<Message>(this.URL, {position: position, name: name, type: type, username: this.connectionService.username})
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    public getAllDifference(name: string): Observable<GeometryData[]> {
        return this.http.post<Message>(`${this.URL}/differences`, {name})
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }
}
