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
    private readonly SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    public readonly nbPlayers: number;

    public foundDifferencesCounter: number;
    private name: string;
    private id: string;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;
    private canClick: boolean;

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
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${SERVER_ADDRESS}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        if (this.canClick) {
            this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
                .subscribe((isDifference: boolean) => {
                    if (isDifference) {
                        this.differenceFound();
                    } else {
                        this.identificationError(position);
                    }
                },
            );
        }
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.updateDifferenceImage();
        this.playSound();
    }

    private updateDifferenceImage(): void {
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.id}.bmp?${this.foundDifferencesCounter}`;
    }

    private playSound(): void {
        this.SOUND.currentTime = 0;
        this.SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }

    private identificationError(position: [number, number]): void {
        this.changeCursor();
    }

    private changeCursor(): void {
        const ONE_SEC: number = 1000;
        const normalCursor: string = "not-allowed";
        const errorCursor: string = "context-menu";

        this.canClick = false;
        this.containerRef.nativeElement.style.cursor = normalCursor;

        setTimeout(() => {
            this.containerRef.nativeElement.style.cursor = errorCursor;
            this.canClick = true;
        },         ONE_SEC);
    }
}
