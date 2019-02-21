import { Component, EventEmitter, Output } from "@angular/core";
import { FormValidationFreeViewService } from "../form-validation-free-view.service";
import { GameFreeViewGenerationService } from "../game-free-view-generation.service";
@Component({
    selector: "app-free-view-game-creation",
    templateUrl: "./free-view-game-creation.component.html",
    styleUrls: ["./free-view-game-creation.component.css"],
})
export class FreeViewGameCreationComponent {
    public readonly OPTION_MIN_NAME_LENGTH: number = 5;
    public readonly OPTION_MAX_NAME_LENGTH: number = 15;
    public name: string = "";
    public isAdding: boolean = false;
    public isRemoval: boolean = false;
    public isColorChange: boolean = false;
    public nbObjects: number;
    public sceneType: string;
    @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
    public constructor(private gameFreeViewGenerationService: GameFreeViewGenerationService) { }

    public isAIntInRange(): boolean {
        return !Number.isNaN(this.nbObjects) && 
                Number(this.nbObjects) <= 200 &&
                Number(this.nbObjects) >= 10;

    }

    public close(): void {
        this.closeForm.emit(false);
    }

    public get allValuesEntered(): boolean {
        return FormValidationFreeViewService.isFormValid(this.name, this.nbObjects, this.isAdding, this.isRemoval, this.isColorChange);
    }

    public submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }

    private sendForm(): void {
        const formData: FormData = new FormData();
        formData.append("name", this.name);
        formData.append("nbObjects", String(this.nbObjects));
        formData.append("isAdding", String(this.isAdding));
        formData.append("isRemoval", String(this.isRemoval));
        formData.append("isColorChange", String(this.isColorChange));
        formData.append("objectType", this.sceneType);

        this.gameFreeViewGenerationService.postGenerate(formData);
    }

}
