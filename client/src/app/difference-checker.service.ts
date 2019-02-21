import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Message } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class DifferenceCheckerService {

    private readonly IMAGE_WIDTH: number = 640;
    private readonly IMAGE_HEIGHT: number = 480;
    private readonly HTML_IMAGE_WIDTH: number = 500;
    private readonly HTML_IMAGE_HEIGHT: number = 375;

    public readonly BASE_URL: string = "http://localhost:3000/api/difference/";
    public constructor(private http: HttpClient) { }

    public isPositionDifference(id: string, x: number, y: number): Observable<boolean> {
        x = Math.floor(this.mapValue(x, 0, this.HTML_IMAGE_WIDTH, 0, this.IMAGE_WIDTH));
        // We have to flip the y since the pixels are stored in bottom-up format
        y = Math.floor(this.mapValue(y, 0, this.HTML_IMAGE_HEIGHT, this.IMAGE_HEIGHT, 0));

        return this.http.get<Message>(this.BASE_URL + id + "/" + x + "/" + y)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    private mapValue(val: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
}
