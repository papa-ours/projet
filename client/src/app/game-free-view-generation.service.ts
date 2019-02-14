import { of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Message } from "../../../common/communication/message";

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class GameFreeViewGenerationService {
    
    public readonly URL: string = "http://localhost:3000/api/gamefreeview";
    public constructor(private http: HttpClient) { }

    public postGenerate(formData: FormData): Observable<Message> {
        return this.http.post<Message>(this.URL, {
            name: formData.get("name"),
            nbObjects: formData.get("nbObjects"),
            ajout: formData.get("ajout"),
            suppression: formData.get("suppression"),
            changementCouleur: formData.get("changementCouleur"),
            objectType: formData.get("objectType")
        }).pipe(catchError(this.handleError<Message>("postGenerateFreeViewData")),
        );
    }
    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => of(result as T);
    }

}
