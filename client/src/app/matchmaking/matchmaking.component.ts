import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router} from "@angular/router";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { ConnectionService } from "../connection.service";
import { GameplayService } from "../gameplay.service";
import { SocketService } from "../socket.service";
import { GameMode } from "../../../../common/communication/game-description";

@Component({
    selector: "app-matchmaking",
    templateUrl: "./matchmaking.component.html",
    styleUrls: ["./matchmaking.component.css"],
})
export class MatchmakingComponent implements OnInit {
    public username: string;
    public faUser: IconDefinition = faUser;
    public joinSubscription: Subscription;

    public constructor(
        private route: ActivatedRoute,
        private connectionService: ConnectionService,
        private location: Location,
        private router: Router,
        private socketService: SocketService,
        private gameplayService: GameplayService,
    ) {
    }

    public ngOnInit(): void {
        this.connectionService.connected ?
            this.username = this.connectionService.username :
            this.router.navigateByUrl("").catch((error: Error) => console.error(error.message));

        this.route.params.subscribe((params: Params) => {
            this.gameplayService.createWaitingRoom(params["name"], params["type"], this.username).subscribe(() => {
                this.joinSubscription = this.socketService.getPlayerHasJoined().subscribe((id: string) => {
                    this.router.navigateByUrl(`game/${params["name"]}/${params["type"]}/${GameMode.Pvp}/${id}`)
                    .catch((error: Error) => console.error(error.message));
                });
            });
        });
    }

    public goToGameList(): void {
        this.location.back();
    }
}
