import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-free-view-game-creation',
  templateUrl: './free-view-game-creation.component.html',
  styleUrls: ['./free-view-game-creation.component.css']
})
export class FreeViewGameCreationComponent implements OnInit {
    public name: string = "";
    constructor() { }

    ngOnInit() {
    }

}
