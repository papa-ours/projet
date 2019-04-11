import { Component, EventEmitter, Output } from "@angular/core";
import { GameType } from "../../../../common/communication/game-description";
import { FormValidationFreeViewService } from "../form-validation-free-view.service";
import { FreeViewForm } from "../free-view-form";
import { GameFreeViewGenerationService } from "../game-free-view-generation.service";
import { GameNameCheckerService } from "../game-name-checker.service";
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
    public loading: boolean;

    public hasFormError: boolean;
    public freeViewForm: FreeViewForm;
    @Output() public closeForm: EventEmitter<boolean>;
    public constructor(
            private gameFreeViewGenerationService: GameFreeViewGenerationService,
            private gameNameCheckerService: GameNameCheckerService,
            ) {
        this.freeViewForm = {
            name: "",
            nbObjects: 0,
            isAdding: false,
            isRemoval: false,
            isColorChange: false,
            sceneType: "geometric",
        };
        this.closeForm = new EventEmitter();
        this.hasFormError = false;
        this.loading = false;
        gameNameCheckerService.initialize();
    }

    public isNbObjectValid(): boolean {
        return !Number.isNaN(this.freeViewForm.nbObjects) &&
                Number(this.freeViewForm.nbObjects) <= this.NB_OBJECTS_MAX &&
                Number(this.freeViewForm.nbObjects) >= this.NB_OBJECTS_MIN;

    }

    public isNameDuplicate(): boolean {
        return this.gameNameCheckerService.checkName(this.freeViewForm.name, GameType.Free);
    }

    public close(): void {
        this.closeForm.emit(false);
    }

    public get allValuesEntered(): boolean {
        return FormValidationFreeViewService.isFormValid(this.freeViewForm);
    }

    public submitForm(): void {
        if (this.allValuesEntered && !this.isNameDuplicate()) {
            this.sendForm();
            this.close();
            // Otherwise, CI fails
            // tslint:disable-next-line:no-suspicious-comment
            // TODO: tell the user that the request is being processed
        } else {
            this.hasFormError = true;
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

        this.loading = true;
        this.gameFreeViewGenerationService.postGenerate(formData).then(() => {
            location.reload();
        }).catch((err: Error) => {
            alert("Erreur lors de la création de la fiche:\n" + err);
        });
    }

}
