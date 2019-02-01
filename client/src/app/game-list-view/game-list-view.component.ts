import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game-list-view",
  templateUrl: "./game-list-view.component.html",
  styleUrls: ["./game-list-view.component.css"],
})
export class GameListViewComponent implements OnInit {

  // @ts-ignore
  private username: string = "";
  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params["username"];
    });
  }

}
