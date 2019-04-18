import { Location } from "@angular/common";
import { Component, OnDestroy OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router} from "@angular/router";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
import { GameMode, GameType } from "../../../../common/communication/game-description";
import { ConnectionService } from "../connection.service";
import { GameplayService } from "../gameplay.service";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-matchmaking",
    templateUrl: "./matchmaking.component.html",
    styleUrls: ["./matchmaking.component.css"],
})
export class MatchmakingComponent implements OnInit, OnDestroy {
    public username: string;
    public faUser: IconDefinition = faUser;
    public joinSubscription: Subscription;
    private name: string;
    private type: GameType;
    public isGameCreated: boolean;
    public other: string;

    public constructor(
        private route: ActivatedRoute,
        private connectionService: ConnectionService,
        private location: Location,
        private router: Router,
        private socketService: SocketService,
        private gameplayService: GameplayService,
    ) {
        this.other = "";

        this.connectionService.connected ?
            this.username = this.connectionService.username :
            this.router.navigateByUrl("").catch((error: Error) => console.error(error.message));
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.isGameCreated = JSON.parse(params["create"]);
            this.isGameCreated ? this.joinWaitingRoom() : this.createWaitingRoom();

            this.socketService.getUserJoined().subscribe((usernames: string[]) => {
                this.username = usernames[0];
                this.other = usernames[1] ? usernames[1] : "";
            });
        });
    }

    public ngOnDestroy(): void {
        this.joinSubscription.unsubscribe();
    }

    private createWaitingRoom(): void {
        this.gameplayService.createWaitingRoom(this.name, this.type, this.username).subscribe(() => {
            this.waitForGameReady();
        });
    }

    private joinWaitingRoom(): void {
        this.gameplayService.joinWaitingRoom(this.name, this.type, this.username).subscribe(() => {
            this.waitForGameReady();
        });
    }

    private waitForGameReady(): void {
        this.joinSubscription = this.socketService.getGameReady().subscribe((id: string) => {
            this.router.navigateByUrl(`game/${this.name}/${this.type}/${GameMode.Pvp}/${id}`)
                .catch((error: Error) => console.error(error.message));
        });
    }

    public goToGameList(): void {
        this.gameplayService.deleteWaitingRoom(this.name, this.type, this.username).subscribe(() => this.location.back());
    }
}
