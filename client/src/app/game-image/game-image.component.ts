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
        const x: number = event.x - imageRectangle.left;
        const y: number = event.y - imageRectangle.top;

        const pixelX: number = Math.floor(this.mapValue(x, 0, this.HTML_IMAGE_WIDTH, 0, this.IMAGE_WIDTH));
        // We have to flip the y since the pixels are stored in bottom-up format
        const pixelY: number = Math.floor(this.mapValue(y, 0, this.HTML_IMAGE_HEIGHT, this.IMAGE_HEIGHT, 0));

        this.checkDifference.emit([pixelX, pixelY]);
    }

    private mapValue(val: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
        return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
    }
}
