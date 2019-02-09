import { Component, HostListener, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-game-image",
  templateUrl: "./game-image.component.html",
  styleUrls: ["./game-image.component.css"],
})
export class GameImageComponent implements OnInit {
    @Input() public source: string;
    public constructor() { }
    public ngOnInit() {
    }

    // tslint:disable-next-line:no-any
    @HostListener("click", ["$event"]) public checkDifference(event: any): void {
    }
}
