import { Component, OnInit, Input } from '@angular/core';
import { Privilege } from "../../../../common/communication/game-description";
@Component({
  selector: 'app-admin-view',
  //templateUrl: './admin-view.component.html',
  template: `
  <div class="admin-fixed-bar">
    <button class="button" (click)="showForm2D= !showForm2D">Créer un jeu 2D</button>
    <button class="button" (click)="showForm3D= !showForm3D">Créer un jeu 3D</button>
  </div>
  <div class="game-lists">
    <app-game-list [is2D]="true" [privilege]=${Privilege.ADMIN}></app-game-list>
    <app-game-list [is2D]="false" [privilege]=${Privilege.ADMIN}></app-game-list>
  </div>
  <div class="form-area" *ngIf="showForm2D">
    <app-simple-game-creation (closeForm)="showForm2D= $event"></app-simple-game-creation>
  </div>
  `,
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  showForm2D:boolean=false;
  showForm3D:boolean=false;

}
