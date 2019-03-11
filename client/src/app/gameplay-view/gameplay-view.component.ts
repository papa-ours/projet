import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P, SERVER_ADDRESS } from "../../../../common/communication/constants";
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
    private readonly CORRECT_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    private readonly WRONG_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Wrong-answer.mp3");
    public readonly nbPlayers: number;

    public foundDifferencesCounter: number;
    private name: string;
    private id: string;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;
    private canClick: boolean;
    public showError: boolean;
    public clickPosition: [number, number];

    @ViewChild("container") private containerRef: ElementRef;

    public constructor(
        private route: ActivatedRoute,
        private differenceCheckerService: DifferenceCheckerService,
        private gameplayService: GameplayService,
    ) {
        this.nbPlayers = 1;
        this.requiredDifferences = this.nbPlayers === 1 ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
        this.foundDifferencesCounter = 0;
        this.images = [];
        this.canClick = true;
        this.showError = false;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.gameplayService.getGameId(this.name, this.type).subscribe((id: string) => {
                this.id = id;
            });
            this.setImagesPath();
        });
        const SOUND_VOLUME: number = 0.2;
        this.CORRECT_SOUND.volume = SOUND_VOLUME;
        this.WRONG_SOUND.volume = SOUND_VOLUME;
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${SERVER_ADDRESS}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [[number, number], [number, number]]): void {
        if (this.canClick) {
            this.clickPosition = position[0];
            this.differenceCheckerService.isPositionDifference(this.id, position[1][0], position[1][1])
                .subscribe((isDifference: boolean) => {
                    if (isDifference) {
                        this.differenceFound();
                    } else {
                        this.identificationError();
                    }
                },
            );
        }
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.updateDifferenceImage();
        this.playCorrectSound();
    }

    private updateDifferenceImage(): void {
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.id}.bmp?${this.foundDifferencesCounter}`;
    }

    private playCorrectSound(): void {
        this.CORRECT_SOUND.currentTime = 0;
        this.CORRECT_SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }

    private identificationError(): void {
        this.displayErrorFeedback();
        this.playWrongSound();
    }

    private displayErrorFeedback(): void {
        const ONE_SEC: number = 1000;
        const NORMAL_CURSOR: string = "context-menu";
        const ERROR_CURSOR: string = "not-allowed";

        this.canClick = false;
        this.showError = true;
        this.containerRef.nativeElement.style.cursor = ERROR_CURSOR;

        setTimeout(() => {
            this.containerRef.nativeElement.style.cursor = NORMAL_CURSOR;
            this.canClick = true;
            this.showError = false;
        },         ONE_SEC);
    }

    private playWrongSound(): void {
        this.WRONG_SOUND.currentTime = 0;
        this.WRONG_SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }
}
