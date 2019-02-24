import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameSheet } from "../../../../common/communication/game-description";
import { ConnectionService } from "../connection.service";
import { GameListService } from "../game-list-getter.service";

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

    @Input() public isAdmin: boolean = false;
    public username: string = "";
    private games: GameSheet[][] = [];

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
        private connectionService: ConnectionService,
        private gameListService: GameListService,
    ) {}

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
