import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class DifferenceCheckerService {

    public readonly BASE_URL: string = "http://localhost:3000/api/difference/";
    public constructor(private http: HttpClient) { }

    public isPositionDifference(id: string, x: number, y: number): Observable<boolean> {
        return this.http.get<Message>(this.BASE_URL + id + "/" + x + "/" + y)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }
}
