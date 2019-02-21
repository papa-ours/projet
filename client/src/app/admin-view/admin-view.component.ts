import { Component, OnInit } from "@angular/core";
import { GameSheet } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service";
import { Privilege } from "../privilege";

enum GameType {
  Simple,
  Free,
}

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.css"],
})

export class AdminViewComponent implements OnInit {

    // @ts-ignore
    public Privilege: enum = Privilege;
    public showForm2D: boolean = false;
    public showForm3D: boolean = false;

    private games: GameSheet[][] = [];

    public constructor(private gameListService: GameListService) {
    }

    public changeShowForm2D(): void {
        this.showForm2D = !this.showForm2D;
        this.showForm3D = false;
    }
    public changeShowForm3D(): void {
        this.showForm3D = !this.showForm3D;
        this.showForm2D = false;
    }

    public ngOnInit(): void {
        this.gameListService.getGameList().subscribe((lists) => {
            this.games[GameType.Simple] = lists.list2d;
            this.games[GameType.Free] = lists.list3d;
        });
    }

}
