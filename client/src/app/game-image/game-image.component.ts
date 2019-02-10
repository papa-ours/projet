import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";

@Component({
  selector: "app-game-image",
  templateUrl: "./game-image.component.html",
  styleUrls: ["./game-image.component.css"],
})
export class GameImageComponent {
    private readonly IMAGE_WIDTH: number = 640;
    private readonly IMAGE_HEIGHT: number = 480;
    private readonly HTML_IMAGE_WIDTH: number = 500;
    private readonly HTML_IMAGE_HEIGHT: number = 375;
    @Input() public source: string;
    @ViewChild("image") private imageElement: ElementRef;
    @Output() private checkDifference: EventEmitter<[number, number]> = new EventEmitter();

    // tslint:disable-next-line:no-any
    @HostListener("click", ["$event"]) public mouseClicked(event: any): void {
        const imageRectangle: DOMRect = this.imageElement.nativeElement.getBoundingClientRect();
        const x: number = this.mapValue(event.x - imageRectangle.left);
        const y: number = this.mapValue(event.y - imageRectangle.top);
        this.checkDifference.emit([x, y]);
    }

    private mapValue(val: number): number {
        return Math.floor(this.IMAGE_WIDTH  / this.HTML_IMAGE_WIDTH * val);
    }

    private mapValueTemp(val: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
}
