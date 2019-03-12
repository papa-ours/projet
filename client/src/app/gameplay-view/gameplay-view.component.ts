import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P, SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { GameMode } from "../../../../common/communication/message";
import { ImageType } from "../../../../common/images/image-type";
import { DifferenceCheckerService } from "../difference-checker.service";
import { GameplayService } from "../gameplay.service";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-gameplay-view",
    templateUrl: "./gameplay-view.component.html",
    styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    public readonly gameMode: GameMode;

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
        private socketService: SocketService,
    ) {
        this.gameMode = GameMode.SOLO;
        this.requiredDifferences = this.gameMode === GameMode.SOLO ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
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
            this.setImagesPath();
            this.socketService.sendGameMode(this.gameMode);
        });
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${SERVER_ADDRESS}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
            .subscribe((isDifference: boolean) => {
                if (isDifference) {
                    this.differenceFound();
                } else {
                    this.socketService.sendErrorIdentificationMessage();
                }
            },
        );
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.updateDifferenceImage();
        this.playSound();
        this.socketService.sendFoundDiffrenceMessage();
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
}
