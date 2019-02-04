import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service";
import { Privilege } from "../privilege";
import { UsernameValidationService } from "../username-validation-service.service";

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

    // @ts-ignore
    private Privilege: enum = Privilege;
    // @ts-ignore
    private username: string = "";
    private games: GameSheetDescription[][] = [];

    public constructor(private route: ActivatedRoute,
                       private router: Router,
                       private usernameValidationService: UsernameValidationService,
                       private gameListService: GameListService) { }

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
        if (!this.usernameValidationService.connected) {
            this.router.navigateByUrl("/login")
                .catch((err: Error) => {
                    console.error(err);
                });
        }
    }
}
