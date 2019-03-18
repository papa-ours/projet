import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SERVER_ADDRESS } from "../../../common/communication/constants";
import { Message } from "../../../common/communication/message";
@Injectable({
  providedIn: "root",
})
export class GameFreeViewGenerationService {

    public readonly URL: string = `${SERVER_ADDRESS}/api/scene`;
    public constructor(private http: HttpClient) { }

    public async postGenerate(formData: FormData): Promise<Message> {
        return this.http.post(this.URL, formData).toPromise()
            .catch((err: Error) => console.error(err.message)) as Promise<Message>;
    }
}
