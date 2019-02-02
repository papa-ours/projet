import { Component, OnInit } from '@angular/core';
import { Privilege } from "../privilege";
@Component({
  selector: 'app-game-list-view',
  templateUrl: './game-list-view.component.html',
  styleUrls: ['./game-list-view.component.css']
})
export class GameListViewComponent implements OnInit {

  Privilege = Privilege;
 

  constructor() { }
  ngOnInit() {
  }

}
