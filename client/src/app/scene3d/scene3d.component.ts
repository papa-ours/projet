import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input ,
         OnChanges, Output, SimpleChange, SimpleChanges, ViewChild} from "@angular/core";
import { GeometryData, SceneData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeplacementCameraService } from "./deplacement-camera.service";
import { GetSceneDataService } from "./get-scene-data.service";
import { RaycasterService } from "./raycaster.service";
import { RenderService } from "./render.service";
import { SceneGeneratorService } from "./scene-generator.service";
import { ThematicSceneGeneratorService } from "./thematic-scene-generator.service";

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
    @Output() private difference3DEvent: EventEmitter<[VectorInterface, SceneType]>;
    @ViewChild("container") private containerRef: ElementRef;
    private sceneType: SceneType;

    public constructor(
        public renderService: RenderService,
        private getSceneData: GetSceneDataService,
        private sceneGeneratorService: SceneGeneratorService,
        public thematicSceneGeneratorService: ThematicSceneGeneratorService,
        ) {
        this.name = "";
        this.renderService = new RenderService();
        this.difference3DEvent = new EventEmitter<[VectorInterface, SceneType]>();
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
        if (this.container.firstChild &&
            differenceChange !== undefined &&
            differenceChange.currentValue > differenceChange.previousValue
        ) {
            this.container.removeChild(this.container.firstChild);
            this.getScene(this.id);
        }
    }

    public ngAfterViewInit(): void {
        this.getScene(this.name);
    }

    private getScene(name: string): void {
        const getFromS3: boolean = this.differenceCounter === 0 || this.differenceCounter === undefined;
        this.getSceneData.getSceneData(name, getFromS3).subscribe(async (sceneData: SceneData) => {
            const geometryData: GeometryData[] = this.type ? sceneData.modifiedScene : sceneData.originalScene;
            this.sceneType = sceneData.type;
            if (this.renderService.scene != null) {
                this.renderService.reInitialize(this.container, await this.createScene(geometryData));
            } else {
                this.renderService.initialize(this.container, await this.createScene(geometryData));
                this.type ? DeplacementCameraService.setRender3dModifiedImage(this.renderService) :
                            DeplacementCameraService.setRender3dOriginalImage(this.renderService);
            }
        });
    }

    private async createScene(geometryData: GeometryData[]): Promise<THREE.Scene> {
        return this.sceneType === SceneType.GEOMETRIC ?
            this.sceneGeneratorService.createScene(geometryData) :
            this.thematicSceneGeneratorService.createScene(geometryData);
    }

    @HostListener("click", ["$event"])
    public mouseClicked(mouseEvent: MouseEvent): void {
            this.difference3DEvent.emit([RaycasterService.getMousePosition(mouseEvent, this.container), this.sceneType]);
    }
}
