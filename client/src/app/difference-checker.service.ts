import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BMP_IMAGE_HEIGHT, BMP_IMAGE_WIDTH, SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";
import { ConnectionService } from "./connection.service";

@Injectable({
    providedIn: "root",
})
export class DifferenceCheckerService {

    private readonly HTML_IMAGE_WIDTH: number = 500;
    private readonly HTML_IMAGE_HEIGHT: number = 375;

    public readonly BASE_URL: string = `${SERVER_ADDRESS}/api/difference`;
    public constructor(
        private http: HttpClient,
        private connectionService: ConnectionService) { }

    public isPositionDifference(id: string, x: number, y: number): Observable<boolean> {
        x = Math.floor(this.mapHtmlPositionToPixel(x, 0, this.HTML_IMAGE_WIDTH, 0, BMP_IMAGE_WIDTH));
        y = Math.floor(this.mapHtmlPositionToPixel(y, 0, this.HTML_IMAGE_HEIGHT, BMP_IMAGE_HEIGHT, 0));

        return this.http.get<Message>(`${this.BASE_URL}/${id}/${x}/${y}/${this.connectionService.username}`)
            .pipe(map((message: Message) => JSON.parse(message.body)),
        );
    }

    private mapHtmlPositionToPixel(val: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
}
