import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from "@angular/core";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { RaycasterService } from "../scene3d/raycaster.service";
import { Scene3dComponent } from "../scene3d/scene3d.component";
import { Difference3DCheckerService } from "./difference3d-checker.service";

@Component({
    selector: "app-gameplay-3d",
    templateUrl: "./gameplay-3d.component.html",
    styleUrls: ["./gameplay-3d.component.css"],
})
export class Gameplay3dComponent implements AfterViewInit {
    @Input() public name: string;
    @Input() public width: number;
    @Input() public height: number;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    private originalScene: Scene3dComponent;
    private modifiedScene: Scene3dComponent;
    private rayCaster: RaycasterService;
    @ViewChildren(Scene3dComponent) private scenes: QueryList<Scene3dComponent>;

    public constructor(private difference3DCheckerService: Difference3DCheckerService) {
        this.foundDifferenceEvent = new EventEmitter<void>();
    }

    public ngAfterViewInit(): void {
        this.originalScene = this.scenes.toArray()[0];
        this.modifiedScene = this.scenes.toArray()[1];
        this.rayCaster = new RaycasterService(this.originalScene.renderService, this.modifiedScene.renderService);
    }

    public checkDifference(mousePosition: VectorInterface): void {
        const position: VectorInterface = this.rayCaster.findObject(mousePosition) as VectorInterface;
        this.difference3DCheckerService.isPositionDifference(position, this.name).subscribe(
            (response: boolean) => {if (response) {
                this.foundDifference();
            }
        });
    }

    private foundDifference(): void {
        this.foundDifferenceEvent.emit();
    }
}
