import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { LOCAL_HOST_PORT, REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P } from "../../../../common/communication/constants";
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

    private readonly SERVER_URL: string = `${LOCAL_HOST_PORT}`;
    public readonly nbPlayers: number = 1;
    public hourglassIcon: IconDefinition;
    public foundDifferencesCounter: number;
    public images: string[];
    public type: GameType;
    public requiredDifferences: number;
    private name: string;
    private sound: HTMLAudioElement;
    private id: string;

    public constructor(
        private route: ActivatedRoute,
        private differenceCheckerService: DifferenceCheckerService,
        private gameplayService: GameplayService,
    ) {
        this.requiredDifferences = this.nbPlayers === 1 ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
        this.hourglassIcon = faHourglassHalf;
        this.foundDifferencesCounter = 0;
        this.images = [];

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
        this.sound.play();
    }
}
