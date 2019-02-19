import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SceneData } from "../../../../common/communication/geometryMessage";

@Injectable({
    providedIn: "root",
})
export class GetSceneDataService {

    public readonly URL: string = "http://132.207.12.131:5001";
    public constructor(private http: HttpClient) { }

    public getSceneData(name: string): Observable<SceneData> {
        return this.http.get<SceneData>(`${this.URL}/${name}-data.txt`)
            .pipe(catchError(this.handleError<SceneData>("postSceneData")),
        );
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }
}
