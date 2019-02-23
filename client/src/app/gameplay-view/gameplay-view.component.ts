import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { GameType } from "../../../../common/communication/game-description";
import { ImageType } from "../../../../common/images/image-type";
import { DifferenceCheckerService } from "../difference-checker.service";
import { GameplayService } from "../gameplay.service";

@Component({
  selector: "app-gameplay-view",
  templateUrl: "./gameplay-view.component.html",
  styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public hourglassIcon: IconDefinition = faHourglassHalf;
    public foundDifferencesCounter: number = 0;
    private name: string;
    private id: string;
    public images: string[] = [];
    private readonly SERVER_URL: string = "http://localhost:3000";
    public readonly nbPlayers: number = 1;
    public requiredDifferences: number;
    private sound: HTMLAudioElement;
    public type: GameType;

    public constructor(
        private route: ActivatedRoute,
        private differenceCheckerService: DifferenceCheckerService,
        private gameplayService: GameplayService,
    ) {
        const ONE_PLAYER_REQUIRED_DIFFERENCES: number = 7;
        const TWO_PLAYERS_REQUIRED_DIFFERENCES: number = 4;
        this.requiredDifferences = this.nbPlayers === 1 ? ONE_PLAYER_REQUIRED_DIFFERENCES : TWO_PLAYERS_REQUIRED_DIFFERENCES;

        const soundUrl: string = "../../../assets/sound/Correct-answer.ogg";
        this.sound = new Audio(soundUrl);
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.gameplayService.getGameId(this.name).subscribe((id: string) => {
                this.id = id;
            });
            this.setImagesPath();
        });
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${this.SERVER_URL}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${this.SERVER_URL}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
            .subscribe((isDifference: boolean) => {
                if (isDifference) {
                    this.foundDifferencesCounter++;
                    this.images[ImageType.Modified] = `${this.SERVER_URL}/${this.id}.bmp?${this.foundDifferencesCounter}` ;
                    this.playSound();
                }
            });
    }

    private playSound(): void {
        this.sound.play();
    }
}
