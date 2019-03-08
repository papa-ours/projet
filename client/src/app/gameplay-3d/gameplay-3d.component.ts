import { Component, Input } from "@angular/core";
import { VectorInterface } from "../../../../common/communication/vector-interface";

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
    public constructor() { }

    public checkDifference(position: VectorInterface): void {
        console.log("received", position);
    }
}
