import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOCAL_HOST_PORT } from "../../../common/communication/constants";
@Injectable({
  providedIn: "root",
})
export class GameFreeViewGenerationService {

    public readonly URL: string = `${LOCAL_HOST_PORT}/api/scene`;
    public constructor(private http: HttpClient) { }

    public postGenerate(formData: FormData): void {
        this.http.post(this.URL, formData).toPromise()
            .catch((err: Error) => console.error(err.message));
    }
}
