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

    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly SERVER_URL: string = "http://localhost:3000";
    private readonly SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    public readonly nbPlayers: number;

    public foundDifferencesCounter: number;
    private name: string;
    private id: string;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;

    public constructor(
        private route: ActivatedRoute,
        private differenceCheckerService: DifferenceCheckerService,
        private gameplayService: GameplayService,
    ) {
        const ONE_PLAYER_REQUIRED_DIFFERENCES: number = 7;
        const TWO_PLAYERS_REQUIRED_DIFFERENCES: number = 4;
        this.nbPlayers = 1;
        this.requiredDifferences = this.nbPlayers === 1 ? ONE_PLAYER_REQUIRED_DIFFERENCES : TWO_PLAYERS_REQUIRED_DIFFERENCES;
        this.foundDifferencesCounter = 0;
        this.images = [];
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
                    this.differenceFound();
                }
            },
        );
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.updateDifferenceImage();
        this.playSound();
    }

    private updateDifferenceImage(): void {
        this.images[ImageType.Modified] = `${this.SERVER_URL}/${this.id}.bmp?${this.foundDifferencesCounter}`;
    }

    private playSound(): void {
        this.SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }
}
