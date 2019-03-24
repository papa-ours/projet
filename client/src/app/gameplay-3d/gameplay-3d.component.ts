import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { SceneType } from "../../../../common/communication/geometry";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RaycasterService } from "../scene3d/raycaster.service";
import { Scene3dComponent } from "../scene3d/scene3d.component";
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
    @Input() private id: string;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    private originalScene: Scene3dComponent;
    private modifiedScene: Scene3dComponent;
    private rayCaster: RaycasterService;
    public differenceCounter: number;
    @ViewChildren(Scene3dComponent) private scenes: QueryList<Scene3dComponent>;

    public constructor(private difference3DCheckerService: Difference3DCheckerService) {
        this.foundDifferenceEvent = new EventEmitter<void>();
        this.differenceCounter = 0;
    }

    public ngAfterViewInit(): void {
        this.originalScene = this.scenes.toArray()[Query.originalScene];
        this.modifiedScene = this.scenes.toArray()[Query.modifiedScene];
        this.rayCaster = new RaycasterService(this.originalScene.renderService, this.modifiedScene.renderService);
    }

    public checkDifference(difference3dEvent: [VectorInterface, SceneType]): void {
        const position: VectorInterface | undefined = this.rayCaster.findObject(difference3dEvent[0], difference3dEvent[1]);
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
