import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";

export interface ClickImagePosition {
    X: number;
    Y: number;
}

export interface ClickPagePosition {
    eventX: number;
    eventY: number;
}

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
    @Output() private checkDifference: EventEmitter<[ClickImagePosition, ClickPagePosition]>;

    public constructor() {
        this.checkDifference = new EventEmitter();
    }

    @HostListener("click", ["$event"])
    public mouseClicked(event: MouseEvent): void {
        const imageRectangle: DOMRect = this.imageElement.nativeElement.getBoundingClientRect();
        const x: number = event.x - imageRectangle.left;
        const y: number = event.y - imageRectangle.top;

        this.checkDifference.emit([{X: x, Y: y}, {eventX: event.x, eventY: event.y}]);
    }
}
