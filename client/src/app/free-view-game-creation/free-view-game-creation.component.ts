import { Component, EventEmitter, Output } from "@angular/core";
import { FormValidationFreeViewService } from "../form-validation-free-view.service";
import { GameFreeViewGenerationService } from "../game-free-view-generation.service";
@Component({
    selector: "app-free-view-game-creation",
    templateUrl: "./free-view-game-creation.component.html",
    styleUrls: ["./free-view-game-creation.component.css"],
})
export class FreeViewGameCreationComponent {
    public name: string = "";
    public adding: boolean = false;
    public removal: boolean = false;
    public colorChange: boolean = false;
    public nbObjects: number;
    public sceneType: string;
    @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
    public constructor(private gameFreeViewGenerationService: GameFreeViewGenerationService) { }

    public isAInt(): boolean {
        return (!Number.isNaN(this.nbObjects));

    }

    public close(): void {
        this.closeForm.emit(false);
    }

    public get allValuesEntered(): boolean {
        return FormValidationFreeViewService.isFormValid(this.name, this.nbObjects, this.adding, this.removal, this.colorChange);
    }
    // @ts-ignore
    private submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }

    private sendForm(): void {
        const formData: FormData = new FormData();
        formData.append("name", this.name);
        formData.append("nbObjects", String(this.nbObjects));
        formData.append("adding", String(this.adding));
        formData.append("removal", String(this.removal));
        formData.append("colorChange", String(this.colorChange));
        formData.append("objectType", this.sceneType);

        this.gameFreeViewGenerationService.postGenerate(formData);
    }

}
