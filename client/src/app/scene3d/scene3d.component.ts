import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { SceneData } from "../../../../common/communication/geometryMessage";
import { GetSceneDataService } from "./get-scene-data.service";
import { RenderService } from "./render.service";
import { SceneGeneratorService } from "./scene-generator.service";

@Component({
    selector: "app-scene3d",
    templateUrl: "./scene3d.component.html",
    styleUrls: ["./scene3d.component.css"],
})
export class Scene3dComponent implements AfterViewInit {

    public constructor(private renderService: RenderService,
                       private getSceneData: GetSceneDataService,
                       private sceneGeneratorService: SceneGeneratorService) {
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
        this.getSceneData.postSceneData(200).subscribe((data) => {
            const sceneData: SceneData = JSON.parse( data.body);
            this.renderService.initialize(this.container, this.sceneGeneratorService.createScene(sceneData.originalScene));
        });
    }

}
