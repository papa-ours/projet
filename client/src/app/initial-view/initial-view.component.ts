import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "../../../../common/communication/message";
import { UsernameValidationService } from "../username-validation-service.service";

@Component({
  selector: "app-initial-view",
  templateUrl: "./initial-view.component.html",
  styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
  private username: string = "";
  private usernameValidationMessage: string = "";

  public constructor(private usernameValidationService: UsernameValidationService,
                     private router: Router) { }

  public ngOnInit(): void {
    if (this.usernameValidationService.connected) {
      this.deleteUsername();
    }

    this.usernameValidationService.getUsernameValidation().subscribe((message: Message) => {
      this.usernameValidationMessage = message.body;
      if (this.usernameValidationMessage === "") {
        this.usernameValidationService.connected = true;
        this.usernameValidationService.username = this.username;
        this.router.navigateByUrl("/gamelist/" + this.username)
        .catch((err: Error) => {
          console.error(err);
        });
      }
    });
  }

  private deleteUsername(): void {
    this.usernameValidationService.deleteUsername();
    this.usernameValidationService.connected = false;
  }

  // @ts-ignore
  private validateUsername(): void {
    this.usernameValidationService.sendUsername(this.username);
  }
}
