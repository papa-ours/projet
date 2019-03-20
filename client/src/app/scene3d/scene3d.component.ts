import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input ,
         OnChanges, Output, SimpleChange, SimpleChanges, ViewChild} from "@angular/core";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeplacementCameraService } from "../scene3d/deplacement-camera.service";
import { GetSceneDataService } from "./get-scene-data.service";
import { RaycasterService } from "./raycaster.service";
import { RenderService } from "./render.service";
import { SceneGeneratorService } from "./scene-generator.service";

@Component({
    selector: "app-scene3d",
    templateUrl: "./scene3d.component.html",
    styleUrls: ["./scene3d.component.css"],
})
export class Scene3dComponent implements AfterViewInit, OnChanges {

    @Input() private name: string;
    @Input() public width: number;
    @Input() public height: number;
    @Input() public type: number;
    @Input() public differenceCounter: number;
    @Input() public id: string;
    @Output() private difference3DEvent: EventEmitter<VectorInterface>;
    @ViewChild("container")
    private containerRef: ElementRef;

    public constructor(
        public renderService: RenderService,
        private getSceneData: GetSceneDataService,
        private sceneGeneratorService: SceneGeneratorService,
        ) {
        this.name = "";
        this.renderService = new RenderService();
        this.difference3DEvent = new EventEmitter<VectorInterface>();
    }

    public get container(): HTMLDivElement {
        return this.containerRef.nativeElement;
    }

    @HostListener("window:resize", ["$event"])
    public onResize(): void {
        this.renderService.onResize();
    }
    public ngOnChanges(changes: SimpleChanges): void {
        const differenceChange: SimpleChange = changes.differenceCounter;
        if (this.container.firstChild && differenceChange.currentValue > differenceChange.previousValue) {
            this.container.removeChild(this.container.firstChild);
            this.getScene(this.id);
        }
    }

    public ngAfterViewInit(): void {
        this.getScene(this.name);
    }

    private getScene(name: string): void {
        this.getSceneData.getSceneData(name).subscribe((sceneData: SceneData) => {
            const geometryData: GeometryData[] = this.type ? sceneData.modifiedScene : sceneData.originalScene;
            if (this.renderService.scene != null) {
                this.renderService.reInitialize(this.container, this.sceneGeneratorService.createScene(geometryData));
            } else {
                this.renderService.initialize(this.container, this.sceneGeneratorService.createScene(geometryData));
                if (this.type) {
                    DeplacementCameraService.setRender3dModifiedImage(this.renderService);
                } else {
                    DeplacementCameraService.setRender3dOriginalImage(this.renderService);
                }
            }
        });
    }

    @HostListener("click", ["$event"])
    public mouseClicked(mouseEvent: MouseEvent): void {
            this.difference3DEvent.emit(RaycasterService.getMousePosition(mouseEvent, this.container));
    }

}
