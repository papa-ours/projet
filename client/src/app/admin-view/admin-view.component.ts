import { Component, OnInit, Input } from '@angular/core';
import { Privilege } from "../../../../common/communication/game-description";
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  @Input() privilege: Privilege ;
  Privilege = Privilege.ADMIN;
  showForm2D:boolean=false;
  showForm3D:boolean=false;

}
