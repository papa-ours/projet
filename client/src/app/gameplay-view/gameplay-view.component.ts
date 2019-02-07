import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-gameplay-view",
  templateUrl: "./gameplay-view.component.html",
  styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public hourglassIcon: IconDefinition = faHourglassHalf;
    private id: string;

    public constructor(private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
        });
    }
}
