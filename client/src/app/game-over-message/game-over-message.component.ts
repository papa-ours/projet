import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ConnectionService } from "../connection.service";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-game-over-message",
  templateUrl: "./game-over-message.component.html",
  styleUrls: ["./game-over-message.component.css"],
})
export class GameOverMessageComponent implements OnDestroy {

    private readonly WINNER_MESSAGE: string = "Bravo! Vous avez trouvé les différences!";
    private readonly LOSER_MESSAGE: string = "Vous avez perdu";

    public endGameMessage: string;
    private winnerSubscription: Subscription;

    public constructor(
        private router: Router,
        private connectionService: ConnectionService,
        private socketService: SocketService,
    ) {
        this.endGameMessage = "";
        this.winnerSubscription = this.socketService.getWinner().subscribe((winner: string) => {
            this.endGameMessage = winner === this.connectionService.username ? this.WINNER_MESSAGE : this.LOSER_MESSAGE;
        });
    }

    public ngOnDestroy(): void {
        this.winnerSubscription.unsubscribe();
    }

    public returnToLobby(): void {
        this.router.navigateByUrl(`/gamelist/${this.connectionService.username}`)
                    .catch((err: Error) => {
                        console.error(err);
                    },
                );
    }
}
