import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HEIGHT, SERVER_ADDRESS, WIDTH } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";

@Injectable({
    providedIn: "root",
})
export class DifferenceCheckerService {

    private readonly HTML_IMAGE_WIDTH: number = 500;
    private readonly HTML_IMAGE_HEIGHT: number = 375;

    public readonly BASE_URL: string = `${SERVER_ADDRESS}/api/difference/`;
    public constructor(private http: HttpClient) { }

    public isPositionDifference(id: string, x: number, y: number): Observable<boolean> {
        x = Math.floor(this.mapHtmlPositionToPixel(x, 0, this.HTML_IMAGE_WIDTH, 0, WIDTH));
        y = Math.floor(this.mapHtmlPositionToPixel(y, 0, this.HTML_IMAGE_HEIGHT, HEIGHT, 0));

        return this.http.get<Message>(this.BASE_URL + id + "/" + x + "/" + y)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    private mapHtmlPositionToPixel(val: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
}
