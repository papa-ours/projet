import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { RenderService } from "./render.service";

@Component({
    selector: "app-scene3d",
    templateUrl: "./scene3d.component.html",
    styleUrls: ["./scene3d.component.css"],
})
export class Scene3dComponent implements AfterViewInit {

    public constructor(private renderService: RenderService) {
    }

    private get container(): HTMLDivElement {
        return this.containerRef.nativeElement;
    }

    @ViewChild("container")
    private containerRef: ElementRef;

    @Input()
    public rotationSpeedX: number = 0.005;

    @Input()
    public rotationSpeedY: number = 0.01;

    @HostListener("window:resize", ["$event"])
    public onResize(): void {
        this.renderService.onResize();
    }

    public ngAfterViewInit(): void {
        this.renderService.initialize(this.container, this.rotationSpeedX, this.rotationSpeedY);
    }

}
