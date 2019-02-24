import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsernameValidationService } from "../username-validation-service.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private username: string = "";
    private usernameValidationMessage: string = "";

    public constructor(
        private usernameValidationService: UsernameValidationService,
        private router: Router,
    ) { }

    public ngOnInit(): void {
        if (this.usernameValidationService.connected) {
            this.deleteUsername();
        }
    }

    private deleteUsername(): void {
        this.usernameValidationService.deleteUsername().subscribe();
        this.usernameValidationService.connected = false;
    }

    public validateUsername(): void {
        this.usernameValidationService.getUsernameValidation(this.username).subscribe((validation: string) => {
            this.usernameValidationMessage = validation;
            if (this.usernameValidationMessage === "") {
                this.usernameValidationService.connected = true;
                this.usernameValidationService.username = this.username;
                this.router.navigateByUrl("/gamelist/" + this.username)
                    .catch((err: Error) => {
                        console.error(err);
                    },
                );
            }
        });
    }
}
