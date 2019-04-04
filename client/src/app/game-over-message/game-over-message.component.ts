import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-game-over-message',
  templateUrl: './game-over-message.component.html',
  styleUrls: ['./game-over-message.component.css']
})
export class GameOverMessageComponent {

    public constructor(private router: Router) {
        
    }

    public returnToLobby(): void {
        this.router.navigateByUrl("/gamelist/" + "aaa")
                    .catch((err: Error) => {
                        console.error(err);
                    },
                );
    }
}
