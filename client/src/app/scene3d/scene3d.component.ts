import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input , Output, ViewChild} from "@angular/core";
import { GeometryData, SceneData } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { GetSceneDataService } from "./get-scene-data.service";
import { RaycasterService } from "./raycaster.service";
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
    @Output() private difference3DEvent: EventEmitter<VectorInterface>;
    @ViewChild("container")
    private containerRef: ElementRef;

    public constructor(
        private renderService: RenderService,
        private getSceneData: GetSceneDataService,
        private sceneGeneratorService: SceneGeneratorService,
        private rayCaster: RaycasterService,
        ) {
        this.name = "";
        this.renderService = new RenderService();
        this.difference3DEvent = new EventEmitter<VectorInterface>();
        this.rayCaster = new RaycasterService(this.renderService);
    }

    private get container(): HTMLDivElement {
        return this.containerRef.nativeElement;
    }

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

    @HostListener("click", ["$event"])
    public mouseClicked(event: MouseEvent): void {
        const position: THREE.Vector3 | undefined = this.rayCaster.findObject(event, this.container);
        if (position !== undefined) {
            this.difference3DEvent.emit({ x: position.x, y: position.y, z: position.z });
        }
    }

}
