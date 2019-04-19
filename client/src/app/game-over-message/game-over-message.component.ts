import { Component, Input, OnChanges,  } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "../connection.service";

@Component({
  selector: "app-game-over-message",
  templateUrl: "./game-over-message.component.html",
  styleUrls: ["./game-over-message.component.css"],
})
export class GameOverMessageComponent implements OnChanges {

    private readonly WINNER_MESSAGE: string = "Bravo! Vous avez trouvé les différences!";
    private readonly LOSER_MESSAGE: string = "Vous avez perdu";

    public endGameMessage: string;
    @Input() private winner: string;

    public constructor(
        private router: Router,
        private connectionService: ConnectionService,
    ) {
        this.endGameMessage = "";
    }

    public ngOnChanges(): void {
        this.endGameMessage = this.winner === this.connectionService.username ? this.WINNER_MESSAGE : this.LOSER_MESSAGE;
    }

    public returnToLobby(): void {
        this.router.navigateByUrl(`/gamelist/${this.connectionService.username}`)
                    .catch((error: Error) => console.error(error.message));
    }
}
