import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { SceneData } from "../../../../common/communication/geometry";

@Injectable({
    providedIn: "root",
})
export class GetSceneDataService {

    public readonly URL: string = `${SERVER_ADDRESS}`;
    public constructor(private http: HttpClient) { }

    public getSceneData(name: string): Observable<SceneData> {
        return this.http.get<SceneData>(`https://s3.amazonaws.com/uploads-diffs/${name}-data.json`)
            .pipe(catchError(this.handleError<SceneData>("getSceneData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
