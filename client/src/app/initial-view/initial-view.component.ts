import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "../connection.service";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-initial-view",
    templateUrl: "./initial-view.component.html",
    styleUrls: ["./initial-view.component.css"],
})
export class InitialViewComponent implements OnInit {
    private username: string;
    private usernameValidationMessage: string;

    public constructor(
        private connectionService: ConnectionService,
        private router: Router,
        private socketService: SocketService,
    ) {
        this.username = "";
        this.usernameValidationMessage = "";
    }

    public ngOnInit(): void {
        if (this.connectionService.connected) {
            this.deleteUsername();
        }
    }

    private deleteUsername(): void {
        this.connectionService.deleteUsername().subscribe();
        this.connectionService.connected = false;
    }

    public validateUsername(): void {
        this.connectionService.getUsernameValidation(this.username).subscribe((validation: string) => {
            this.usernameValidationMessage = validation;
            if (this.usernameValidationMessage === "") {
                this.connectionService.connected = true;
                this.connectionService.username = this.username;
                this.socketService.sendNewUserMessage();
                this.router.navigateByUrl("/gamelist/" + this.username)
                    .catch((err: Error) => {
                        console.error(err);
                    },
                );
            }
        });
    }
}
