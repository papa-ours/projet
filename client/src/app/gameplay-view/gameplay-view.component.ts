import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
    REQUIRED_DIFFERENCES_1P,
    REQUIRED_DIFFERENCES_2P,
    S3_BUCKET_URL,
    SERVER_ADDRESS } from "../../../../common/communication/constants";
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

    public readonly nbPlayers: number;
    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");

    public foundDifferencesCounter: number;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;
    public chrono: number;
    private name: string;
    private id: string;
    private isChronoRunning: boolean;

    public constructor(
        private route: ActivatedRoute,
        private differenceCheckerService: DifferenceCheckerService,
        private gameplayService: GameplayService,
    ) {
        this.nbPlayers = 1;
        this.requiredDifferences = this.nbPlayers === 1 ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
        this.foundDifferencesCounter = 0;
        this.images = [];
        this.chrono = 0;
        this.isChronoRunning = false;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.gameplayService.getGameId(this.name, this.type).subscribe((id: string) => {
                this.id = id;
            });
            this.setImagesPath();
            this.startChrono();
        });
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${S3_BUCKET_URL}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${S3_BUCKET_URL}/${this.name}-modifiedImage.bmp`;
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
        if (this.foundDifferencesCounter === REQUIRED_DIFFERENCES_1P) {
            this.isChronoRunning = false;
        }
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

    private startChrono(): void {
        this.isChronoRunning = true;
        this.incrementChrono();
    }

    private incrementChrono(): void {
        const ONE_SECOND: number = 1000;
        setTimeout(
            () => {
                if (this.isChronoRunning) {
                    this.chrono++;
                    this.incrementChrono();
                }
            },
            ONE_SECOND,
        );
    }

    public get formattedChrono(): string {
        const SECONDS: number = 60;
        const seconds: number = this.chrono % SECONDS;
        const minutes: number = Math.floor(this.chrono / SECONDS);

        return `${this.formatTimeUnit(minutes)}:${this.formatTimeUnit(seconds)}`;
    }

    private formatTimeUnit(n: number): string {
        const BASE: number = 10;

        return `${n < BASE ? "0" : ""}${n}`;
    }
}
