import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Position } from "../../../../common/images/position";
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
    @Input() public canClick: boolean;
    @Input() private id: string;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    @Output() public errorIdentificationEvent: EventEmitter<Position>;
    private originalScene: Scene3dComponent;
    private modifiedScene: Scene3dComponent;
    private rayCaster: RaycasterService;
    public differenceCounter: number;
    @ViewChildren(Scene3dComponent) private scenes: QueryList<Scene3dComponent>;

    public constructor(private difference3DCheckerService: Difference3DCheckerService) {
        this.foundDifferenceEvent = new EventEmitter<void>();
        this.errorIdentificationEvent = new EventEmitter<Position>();
        this.differenceCounter = 0;
    }

    public ngAfterViewInit(): void {
        this.originalScene = this.scenes.toArray()[SceneType.originalScene];
        this.modifiedScene = this.scenes.toArray()[SceneType.modifiedScene];
        this.rayCaster = new RaycasterService(this.originalScene.renderService, this.modifiedScene.renderService);
    }

    public checkDifference(mousePosition: [VectorInterface, Position]): void {
        const position: VectorInterface | undefined = this.rayCaster.findObject(mousePosition[0]);
        if (position && this.canClick) {
            this.difference3DCheckerService.isPositionDifference(position, this.id).subscribe(
                (response: boolean) => {
                    response ? this.foundDifference() : this.errorIdentificationEvent.emit(mousePosition[1]);
            });
        }
    }

    private foundDifference(): void {
        this.foundDifferenceEvent.emit();
        this.differenceCounter++;
    }
}
