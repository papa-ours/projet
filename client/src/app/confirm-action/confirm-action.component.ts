import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-confirm-action",
  templateUrl: "./confirm-action.component.html",
  styleUrls: ["./confirm-action.component.css"],
})
export class ConfirmActionComponent {
    @Input() public actionMessage: string;
    @Output() public confirmAction: EventEmitter<boolean>;

    public constructor() {
        this.confirmAction = new EventEmitter<boolean>();
    }

    public confirm(isActionConfirmed: boolean): void {
        this.confirmAction.emit(isActionConfirmed);
    }
}
