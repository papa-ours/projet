import { Component, EventEmitter, Output } from "@angular/core";
import { FormValidationFreeViewService } from "../form-validation-free-view.service";
import { GameFreeViewGenerationService } from "../game-free-view-generation.service";
import { FreeViewForm } from "../freeViewForm";

@Component({
    selector: "app-free-view-game-creation",
    templateUrl: "./free-view-game-creation.component.html",
    styleUrls: ["./free-view-game-creation.component.css"],
})
export class FreeViewGameCreationComponent {
    public readonly OPTION_MIN_NAME_LENGTH: number = 5;
    public readonly OPTION_MAX_NAME_LENGTH: number = 15;
    private readonly NB_OBJECTS_MIN: number = 10;
    private readonly NB_OBJECTS_MAX: number = 200;
    public name: string = "";
    public isAdding: boolean = false;
    public isRemoval: boolean = false;
    public isColorChange: boolean = false;
    public nbObjects: number;
    public sceneType: string;
    public freeViewForm: FreeViewForm;
    @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
    public constructor(private gameFreeViewGenerationService: GameFreeViewGenerationService) { 
        this.freeViewForm.name = "";
        this.freeViewForm.isAdding = false;
        this.freeViewForm.isRemoval = false;
        this.freeViewForm.isColorChange = false;
    }

    public isAIntInRange(): boolean {
        return !Number.isNaN(this.freeViewForm.nbObjects) &&
                Number(this.freeViewForm.nbObjects) <= this.NB_OBJECTS_MAX &&
                Number(this.freeViewForm.nbObjects) >= this.NB_OBJECTS_MIN;

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
        formData.append("name", this.freeViewForm.name);
        formData.append("nbObjects", String(this.freeViewForm.nbObjects));
        formData.append("isAdding", String(this.freeViewForm.isAdding));
        formData.append("isRemoval", String(this.freeViewForm.isRemoval));
        formData.append("isColorChange", String(this.freeViewForm.isColorChange));
        formData.append("objectType", this.freeViewForm.sceneType);

        this.gameFreeViewGenerationService.postGenerate(formData);
    }

}
