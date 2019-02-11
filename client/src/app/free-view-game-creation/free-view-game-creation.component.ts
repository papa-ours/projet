import { Component, OnInit } from '@angular/core';
import { FormValidationFreeViewService } from './form-validation-free-view.service';

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
    constructor(private formValidationFreeViewService: FormValidationFreeViewService) { }

    public isAInt(): boolean {
            this.nbObjectsInt = parseInt(this.nbObjects);
            if (Number.isNaN(this.nbObjectsInt)){
                return false;
            }
            else return true;
        
    }

    public get allValuesEntered(): boolean {
        let allValuesEntered: boolean = false;
        allValuesEntered = this.formValidationFreeViewService.isFormValid(this.name);
        return allValuesEntered;
    }

    ngOnInit() {
    }

}
