import { Location } from "@angular/common";
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
    public other: string;
    public constructor(
        private connectionService: ConnectionService,
        private location: Location,
        private router: Router,
    ) {
       this.other = "";
    }

    public ngOnInit(): void {
        this.connectionService.connected ?
            this.username = this.connectionService.username :
            this.router.navigateByUrl("").catch((error: Error) => console.error(error.message));
    }

    public goToGameList(): void {
        this.location.back();
    }
}
