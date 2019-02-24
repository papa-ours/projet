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
        this.http.post(this.URL, {
            name: formData.get("name"),
            nbObjects: formData.get("nbObjects"),
            isAdding: formData.get("isAdding"),
            isRemoval: formData.get("isRemoval"),
            isColorChange: formData.get("isColorChange"),
            objectType: formData.get("objectType"),
        }).toPromise().catch(console.error);
    }
}
