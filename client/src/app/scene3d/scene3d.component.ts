import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { GetSceneDataService } from "./get-scene-data.service";
import { RenderService } from "./render.service";
import { SceneGeneratorService } from "./scene-generator.service";

@Component({
    selector: "app-scene3d",
    templateUrl: "./scene3d.component.html",
    styleUrls: ["./scene3d.component.css"],
})
export class Scene3dComponent implements AfterViewInit {

    @Input() private name: string;
    @Input() public width: number;
    @Input() public height: number;
    @Input() public type: number;
    public constructor(
        private renderService: RenderService,
        private getSceneData: GetSceneDataService,
        private sceneGeneratorService: SceneGeneratorService,
    ) {
        this.name = "";
    }

    private get container(): HTMLDivElement {
        return this.containerRef.nativeElement;
    }

    @ViewChild("container")
    private containerRef: ElementRef;

    @HostListener("window:resize", ["$event"])
    public onResize(): void {
        this.renderService.onResize();
    }

    public ngAfterViewInit(): void {
        this.getSceneData.getSceneData(this.name).subscribe((sceneData: SceneData) => {
            const geometryData: GeometryData[] = this.type ? sceneData.modifiedScene : sceneData.originalScene;
            this.renderService.initialize(this.container, this.sceneGeneratorService.createScene(geometryData));
        });
    }

}
