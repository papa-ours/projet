import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameListService } from "../game-list-getter.service"

@Component({
  selector: 'app-game-list-view',
  templateUrl: './game-list-view.component.html',
  styleUrls: ['./game-list-view.component.css']
})
export class GameListViewComponent implements OnInit {

  // @ts-ignore
  private username: string = "";
  constructor(private route: ActivatedRoute,
              private gameListService: GameListService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.username = params["username"];
    });

    this.gameListService.getGameList().subscribe((lists) => {
      console.log(lists);
    });
  }

}
