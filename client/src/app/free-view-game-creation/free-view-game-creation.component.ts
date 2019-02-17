import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormValidationFreeViewService } from '../form-validation-free-view.service';
import { GameFreeViewGenerationService } from '../game-free-view-generation.service';
import { Message } from "../../../../common/communication/message";
@Component({
  selector: 'app-free-view-game-creation',
  templateUrl: './free-view-game-creation.component.html',
  styleUrls: ['./free-view-game-creation.component.css']
})
export class FreeViewGameCreationComponent implements OnInit {
    public name: string = "";
    public ajout: boolean = false;
    public suppression: boolean = false;
    public changementCouleur: boolean = false;
    public nbObjects: string = "";
    public nbObjectsInt: number;
    public sceneType: string;
    @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
    constructor(private gameFreeViewGenerationService: GameFreeViewGenerationService) { }

    public isAInt(): boolean {
            this.nbObjectsInt = parseInt(this.nbObjects);
            if (Number.isNaN(this.nbObjectsInt)){
                return false;
            }
            else return true;
        
    }

    public close(): void {
        this.closeForm.emit(false);
    }
    
    public get allValuesEntered(): boolean {
        let allValuesEntered: boolean = false;
        allValuesEntered = FormValidationFreeViewService.isFormValid(this.name,this.nbObjectsInt,this.ajout,this.suppression,this.changementCouleur);
        return allValuesEntered;
    }
    //@ts-ignore
    private submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }

    private sendForm(){
        const formData: FormData = new FormData();
        formData.append("name", this.name);
        formData.append("nbObjects", this.nbObjects);
        formData.append("ajout", String(this.ajout));
        formData.append("suppression", String(this.suppression));
        formData.append("changementCouleur", String(this.changementCouleur));
        formData.append("objectType", this.sceneType);

        this.gameFreeViewGenerationService.postGenerate(formData)
            .subscribe((message: Message) => {
                if (message.body !== "") {
                    
                } else {
                    
                }
            });
    }
    ngOnInit() {
    }

}
