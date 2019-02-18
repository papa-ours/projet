import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class GameFreeViewGenerationService {

    public readonly URL: string = "http://localhost:3000/api/scene";
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
