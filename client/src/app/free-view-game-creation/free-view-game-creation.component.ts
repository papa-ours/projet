import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { FormValidationFreeViewService } from "../form-validation-free-view.service";
import { GameFreeViewGenerationService } from "../game-free-view-generation.service";
@Component({
  selector: "app-free-view-game-creation",
  templateUrl: "./free-view-game-creation.component.html",
  styleUrls: ["./free-view-game-creation.component.css"],
})
export class FreeViewGameCreationComponent implements OnInit {
    public name: string = "";
    public adding: boolean = false;
    public removal: boolean = false;
    public colorChange: boolean = false;
    public nbObjects: string = "";
    public nbObjectsInt: number;
    public sceneType: string;
    @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
    public constructor(private gameFreeViewGenerationService: GameFreeViewGenerationService) { }

    public isAInt(): boolean {
            this.nbObjectsInt = parseInt(this.nbObjects);
            if (Number.isNaN(this.nbObjectsInt)) {
                return false;
            } else { return true; }

    }

    public close(): void {
        this.closeForm.emit(false);
    }

    public get allValuesEntered(): boolean {
        let allValuesEntered: boolean = false;
        allValuesEntered = FormValidationFreeViewService.isFormValid(this.name, this.nbObjectsInt, this.adding, this.removal, this.colorChange);
        return allValuesEntered;
    }
    // @ts-ignore
    private submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }

    private sendForm() {
        const formData: FormData = new FormData();
        formData.append("name", this.name);
        formData.append("nbObjects", this.nbObjects);
        formData.append("adding", String(this.adding));
        formData.append("removal", String(this.removal));
        formData.append("colorChange", String(this.colorChange));
        formData.append("objectType", this.sceneType);

        this.gameFreeViewGenerationService.postGenerate(formData)
            .subscribe((message: Message) => {
                if (message.body !== "") {

                } else {

                }
            });
    }
    public ngOnInit() {
    }

}
