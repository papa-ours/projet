import { Component, HostListener, Input } from "@angular/core";

@Component({
  selector: "app-game-image",
  templateUrl: "./game-image.component.html",
  styleUrls: ["./game-image.component.css"],
})
export class GameImageComponent {
    @Input() public source: string;

    // tslint:disable-next-line:no-any
    @HostListener("click", ["$event"]) public checkDifference(event: any): void {
    }
}
