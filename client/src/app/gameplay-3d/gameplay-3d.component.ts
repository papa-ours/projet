import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input,
    Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { GeometryData, SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { CameraMovementService } from "../scene3d/camera-movement.service";
import { RaycasterService } from "../scene3d/raycaster.service";
import { Scene3dComponent } from "../scene3d/scene3d.component";
import { CheatModeService } from "./cheat-mode.service";
import { Difference3DCheckerService } from "./difference3d-checker.service";

enum Query {
    originalScene,
    modifiedScene,
}

@Component({
    selector: "app-gameplay-3d",
    templateUrl: "./gameplay-3d.component.html",
    styleUrls: ["./gameplay-3d.component.css"],
})
export class Gameplay3dComponent implements AfterViewInit {
    @Input() public width: number;
    @Input() public height: number;
    @Input() public name: string;
    @Input() public canClick: boolean;
    @Input() private id: string;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    @Output() public errorIdentificationEvent: EventEmitter<void>;
    private originalScene: Scene3dComponent;
    private modifiedScene: Scene3dComponent;
    private rayCaster: RaycasterService;
    private cheatModeService: CheatModeService;
    @Input() public differenceCounter: number;
    @ViewChild("originalScene", {read: ElementRef}) private originalSceneElement: ElementRef;
    @ViewChild("modifiedScene", {read: ElementRef}) private modifiedSceneElement: ElementRef;
    @ViewChildren(Scene3dComponent) private scenes: QueryList<Scene3dComponent>;

    public constructor(private difference3DCheckerService: Difference3DCheckerService) {
        this.foundDifferenceEvent = new EventEmitter<void>();
        this.errorIdentificationEvent = new EventEmitter<void>();
        this.differenceCounter = 0;
    }

    public ngAfterViewInit(): void {
        this.originalScene = this.scenes.toArray()[Query.originalScene];
        this.modifiedScene = this.scenes.toArray()[Query.modifiedScene];
        this.rayCaster = new RaycasterService(this.originalScene.renderService, this.modifiedScene.renderService);
        CameraMovementService.setElementRef(this.originalSceneElement, this.modifiedSceneElement);
        CameraMovementService.activateMovement();
        this.cheatModeService = new CheatModeService(this.originalScene.renderService, this.modifiedScene.renderService);
    }

    public checkDifference(difference3dEvent: [VectorInterface, SceneType]): void {
        const position: VectorInterface | undefined = this.rayCaster.findObject(difference3dEvent[0], difference3dEvent[1]);
        if (position && this.canClick) {
            this.difference3DCheckerService.isPositionDifference(position, this.id).subscribe(
                (response: boolean) => {
                    response ? this.foundDifference() : this.errorIdentificationEvent.emit();
            });
        }
    }

    private foundDifference(): void {
        this.foundDifferenceEvent.emit();
        this.differenceCounter++;
        this.difference3DCheckerService.getAllDifference(this.id).subscribe(
            (geometries: GeometryData[]) => this.cheatModeService.updateGeometries(geometries),
        );
    }

    @HostListener("document:keyup.t", ["$event"])
    public toggleCheatMode(): void {
        this.difference3DCheckerService.getAllDifference(this.id).subscribe(
            (geometries: GeometryData[]) => this.cheatModeService.toggleCheatMode(geometries),
        );
    }
}
