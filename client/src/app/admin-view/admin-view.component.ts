import { Component } from "@angular/core";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})

export class AdminViewComponent {

    public showForm2D: boolean;
    public showForm3D: boolean;

    public constructor() {
        this.showForm2D = false;
        this.showForm3D = false;
    }

    public changeShowForm2D(): void {
        this.showForm2D = !this.showForm2D;
        this.showForm3D = false;
    }
    public changeShowForm3D(): void {
        this.showForm3D = !this.showForm3D;
        this.showForm2D = false;
    }

}
