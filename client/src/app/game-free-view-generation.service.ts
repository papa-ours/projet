import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";
import { ThematicObjectGeneratorService } from "./scene3d/thematic-object-generator.service";
@Injectable({
  providedIn: "root",
})
export class GameFreeViewGenerationService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/scene/`;
    public constructor(private http: HttpClient) { }

    public async postGenerate(formData: FormData): Promise<Message> {
        if (formData.get("objectType") === "thematic") {
            formData.append("sizes", JSON.stringify(ThematicObjectGeneratorService.sizes));
        }

        return this.http.post(this.URL + formData.get("objectType"), formData).toPromise()
            .catch((err: Error) => console.error(err.message)) as Promise<Message>;
    }
}
