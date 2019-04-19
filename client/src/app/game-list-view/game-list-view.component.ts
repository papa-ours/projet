import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { GameSheet } from "../../../../common/communication/game-description";
import { ConnectionService } from "../connection.service";
import { GameListService } from "../game-list-getter.service";
import { ThematicObjectGeneratorService } from "../scene3d/thematic-object-generator.service";

enum GameType {
    Simple,
    Free,
}

@Component({
    selector: "app-game-list-view",
    templateUrl: "./game-list-view.component.html",
    styleUrls: ["./game-list-view.component.css"],
})

export class GameListViewComponent implements OnInit {

    @Input() public isAdmin: boolean;
    public username: string;
    public faUser: IconDefinition = faUser;
    private games: GameSheet[][];
    public isGameLoading: boolean;
    public areObjectsLoaded: boolean;

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private connectionService: ConnectionService,
        private gameListService: GameListService,
        private thematicObjectGenerator: ThematicObjectGeneratorService,
    ) {
        this.isGameLoading = false;
        this.areObjectsLoaded = false;
        this.isAdmin = false;
        this.username = "";
        this.games = [];
    }

    public ngOnInit(): void {
        if (this.route.snapshot.url[0].path === "gamelist") {
            this.checkUserConnection();
        }

        this.route.params.subscribe((params) => {
            this.username = params["username"];
        });

        this.gameListService.getGameList().subscribe((lists) => {
            this.games[GameType.Simple] = lists.list2d;
            this.games[GameType.Free] = lists.list3d;
        });

        this.thematicObjectGenerator.waitForObjects()
            .then(() => this.areObjectsLoaded = true)
            .catch((error: Error) => console.error(error.message));
    }

    private checkUserConnection(): void {
        if (!this.connectionService.connected) {
            this.router.navigateByUrl("/login")
                .catch((err: Error) => {
                    console.error(err);
                },
            );
        }
    }
}
