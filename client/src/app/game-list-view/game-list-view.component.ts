import { Component, OnInit } from '@angular/core';
import { Privilege } from "../privilege";
@Component({
  selector: 'app-game-list-view',
  //templateUrl: './game-list-view.component.html',
  template: `
  <div class="game-lists">
    <app-game-list [is2D]="true" [privilege]=${Privilege.USER}></app-game-list>
    <app-game-list [is2D]="false" [privilege]=${Privilege.USER}></app-game-list>
  </div>
  `,
  styleUrls: ['./game-list-view.component.css']
})
export class GameListViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
