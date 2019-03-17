import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { Position } from "../../../../common/images/position";

@Component({
  selector: "app-game-image",
  templateUrl: "./game-image.component.html",
  styleUrls: ["./game-image.component.css"],
})
export class GameImageComponent {

    public readonly HTML_IMAGE_WIDTH: number = 500;
    public readonly HTML_IMAGE_HEIGHT: number = 375;

    @Input() public source: string;
    @ViewChild("image") private imageElement: ElementRef;
    @Output() private checkDifference: EventEmitter<[Position, Position]>;

    public constructor() {
        this.checkDifference = new EventEmitter();
    }

    @HostListener("click", ["$event"])
    public mouseClicked(event: MouseEvent): void {
        const imageRectangle: DOMRect = this.imageElement.nativeElement.getBoundingClientRect();
        const x: number = event.x - imageRectangle.left;
        const y: number = event.y - imageRectangle.top;

        this.checkDifference.emit([{i: x, j: y}, {i: event.x, j: event.y}]);
    }
}
