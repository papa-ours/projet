import { Component } from "@angular/core";
import { ThematicObjectGeneratorService } from "./scene3d/thematic-object-generator.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public constructor(private thematicObjectGenerator: ThematicObjectGeneratorService) {
        this.thematicObjectGenerator.waitForObjects();
    }
}
