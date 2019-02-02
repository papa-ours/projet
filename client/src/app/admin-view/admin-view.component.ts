import { Component, OnInit } from '@angular/core';
import { Privilege } from "../privilege";
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  Privilege = Privilege;
  showForm2D:boolean=false;
  showForm3D:boolean=false;

  constructor() { 
  }
  ngOnInit() {
  }

}
