import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { S3_BUCKET_URL, SERVER_ADDRESS } from "../../../../common/communication/constants";
import { SceneData } from "../../../../common/communication/geometry";

@Injectable({
    providedIn: "root",
})
export class GetSceneDataService {

    public readonly URL: string = `${SERVER_ADDRESS}`;
    public constructor(private http: HttpClient) { }

    public getSceneData(name: string, getFromS3: boolean): Observable<SceneData> {
        const server: string = getFromS3 ? S3_BUCKET_URL : SERVER_ADDRESS;
        const extension: string = getFromS3 ? "json" : "txt";

        return this.http.get<SceneData>(`${server}/${name}-data.${extension}`)
            .pipe(catchError(this.handleError<SceneData>("getSceneData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
