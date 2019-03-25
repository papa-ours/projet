import { Component } from "@angular/core";
import { ThematicObjectGeneratorService } from "../scene3d/thematic-object-generator.service";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})

export class AdminViewComponent {

    public showForm2D: boolean;
    public showForm3D: boolean;
    public areObjectsLoaded: boolean;

    public constructor(private thematicObjectGenerator: ThematicObjectGeneratorService) {
        this.areObjectsLoaded = false;
        this.showForm2D = false;
        this.showForm3D = false;
        this.thematicObjectGenerator.waitForObjects()
            .then(() => this.areObjectsLoaded = true)
            .catch((error: Error) => console.error(error.message));
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
