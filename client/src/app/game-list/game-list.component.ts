import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GameSheet } from "../../../../common/communication/game-description";

@Component({
    selector: "app-game-list",
    templateUrl: "./game-list.component.html",
    styleUrls: ["./game-list.component.css"],
})
export class GameListComponent {

    @Input() public is3D: boolean;
    @Input() public descriptions: GameSheet[];
    @Input() public isAdmin: boolean;
    @Input() public canPlay: boolean;
    @Output() public loadGame: EventEmitter<void>;

    public constructor() {
        this.isAdmin = false;
        this.loadGame = new EventEmitter();
    }
}
