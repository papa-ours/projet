import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})
export class AdminViewComponent implements OnInit {

  public constructor() {}
  public showForm2D: boolean = false;
  public showForm3D: boolean = false;
  public ngOnInit(): void {}

}
