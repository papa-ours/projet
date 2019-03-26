import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ConnectionService } from "../connection.service";

@Component({
    selector: "app-matchmaking",
    templateUrl: "./matchmaking.component.html",
    styleUrls: ["./matchmaking.component.css"],
})
export class MatchmakingComponent implements OnInit {
    public username: string;
    public faUser: IconDefinition = faUser;
    public constructor(
        private connectionService: ConnectionService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        if (!this.connectionService.connected) {
            this.router.navigateByUrl("");
        }
        this.username = this.connectionService.username;
    }
}
