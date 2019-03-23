import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { DeplacementCameraService } from "../scene3d/deplacement-camera.service";
import { RaycasterService } from "../scene3d/raycaster.service";
import { Scene3dComponent } from "../scene3d/scene3d.component";
import { Difference3DCheckerService } from "./difference3d-checker.service";

enum SceneType {
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
    @Input() private id: string;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    private originalScene: Scene3dComponent;
    private modifiedScene: Scene3dComponent;
    private rayCaster: RaycasterService;
    public differenceCounter: number;
    @ViewChild("originalScene", {read: ElementRef}) private originalSceneElement: ElementRef;
    @ViewChild("modifiedScene", {read: ElementRef}) private modifiedSceneElement: ElementRef;
    @ViewChildren(Scene3dComponent) private scenes: QueryList<Scene3dComponent>;

    public constructor(private difference3DCheckerService: Difference3DCheckerService) {
        this.foundDifferenceEvent = new EventEmitter<void>();
        this.differenceCounter = 0;
    }

    public ngAfterViewInit(): void {
        this.originalScene = this.scenes.toArray()[SceneType.originalScene];
        this.modifiedScene = this.scenes.toArray()[SceneType.modifiedScene];
        this.rayCaster = new RaycasterService(this.originalScene.renderService, this.modifiedScene.renderService);
        DeplacementCameraService.setElementRef(this.originalSceneElement, this.modifiedSceneElement);
        DeplacementCameraService.activateMovement();
    }

    public checkDifference(mousePosition: VectorInterface): void {
        const position: VectorInterface | undefined = this.rayCaster.findObject(mousePosition);
        if (position) {
            this.difference3DCheckerService.isPositionDifference(position, this.id).subscribe(
                (response: boolean) => {
                    if (response) {
                        this.foundDifference();
                    }
                });
        }
    }

    private foundDifference(): void {
        this.foundDifferenceEvent.emit();
        this.differenceCounter++;
    }
}
