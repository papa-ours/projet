import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "../connection.service";

@Component({
  selector: "app-game-over-message",
  templateUrl: "./game-over-message.component.html",
  styleUrls: ["./game-over-message.component.css"],
})
export class GameOverMessageComponent {

    public constructor(private router: Router, private connectionService: ConnectionService) {}

    public returnToLobby(): void {
        this.router.navigateByUrl(`/gamelist/${this.connectionService.username}`)
                    .catch((err: Error) => {
                        console.error(err);
                    },
                );
    }
}
