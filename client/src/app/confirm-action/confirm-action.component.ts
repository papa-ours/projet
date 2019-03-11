import { Component, Input } from "@angular/core";

@Component({
  selector: "app-confirm-action",
  templateUrl: "./confirm-action.component.html",
  styleUrls: ["./confirm-action.component.css"],
})
export class ConfirmActionComponent {
    @Input() public actionMessage: string;
}
