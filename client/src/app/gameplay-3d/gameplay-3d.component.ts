import { Component, Input } from "@angular/core";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { Difference3DCheckerService } from "./difference3d-checker.service";

@Component({
    selector: "app-gameplay-3d",
    templateUrl: "./gameplay-3d.component.html",
    styleUrls: ["./gameplay-3d.component.css"],
})
export class Gameplay3dComponent {
    @Input() public name: string;
    @Input() public width: number;
    @Input() public height: number;
    @Input() public type: number;
    public constructor(private difference3DCheckerService: Difference3DCheckerService) { }

    public checkDifference(position: VectorInterface): void {
        this.difference3DCheckerService.isPositionDifference(position, name).subscribe((data) => console.log(data));
    }
}
