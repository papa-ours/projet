import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { GameplayService } from "../gameplay.service";

@Component({
    selector: "app-gameplay-view",
    templateUrl: "./gameplay-view.component.html",
    styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    public readonly nbPlayers: number;

    public foundDifferencesCounter: number;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;

    public constructor(
        private route: ActivatedRoute,
        private gameplayService: GameplayService,
        public name: string,
        public id: string,
    ) {
        this.nbPlayers = 1;
        this.requiredDifferences = this.nbPlayers === 1 ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
        this.foundDifferencesCounter = 0;
        this.images = [];
    }
    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.gameplayService.getGameId(this.name, this.type).subscribe((id: string) => {
                this.id = id;
            });
        });
    }

    public updateView(): void {
        this.foundDifferencesCounter ++;
        this.playSound();
    }

    private playSound(): void {
        this.SOUND.currentTime = 0;
        this.SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }
}
