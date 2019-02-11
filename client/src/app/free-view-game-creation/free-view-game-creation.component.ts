import { Component, OnInit } from '@angular/core';

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
    constructor() { }

    public isAInt(): boolean {
            this.nbObjectsInt = parseInt(this.nbObjects);
            if (Number.isNaN(this.nbObjectsInt)){
                return false;
            }
            else return true;
        
    }
    ngOnInit() {
    }

}
