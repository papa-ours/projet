import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-game-image",
  templateUrl: "./game-image.component.html",
  styleUrls: ["./game-image.component.css"],
})
export class GameImageComponent {
    private readonly IMAGE_WIDTH: number = 640;
    private readonly HTML_IMAGE_WIDTH: number = 500;
    @Input() public source: string;
    @ViewChild("image") private imageElement: ElementRef;

    // tslint:disable-next-line:no-any
    @HostListener("click", ["$event"]) public checkDifference(event: any): void {
        const imageRectangle: DOMRect = this.imageElement.nativeElement.getBoundingClientRect();
        const x: number = this.mapValue(event.x - imageRectangle.left);
        const y: number = this.mapValue(event.y - imageRectangle.top);
    }

    private mapValue(val: number): number {
        return Math.floor(this.IMAGE_WIDTH  / this.HTML_IMAGE_WIDTH * val);
    }
}
