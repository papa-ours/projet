import { Component, OnInit } from "@angular/core";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-gameplay-view",
  templateUrl: "./gameplay-view.component.html",
  styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {
    public hourglassIcon: IconDefinition = faHourglassHalf;
    constructor() { }

    ngOnInit() {
    }
}
