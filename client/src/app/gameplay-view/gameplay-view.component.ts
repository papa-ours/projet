import { Component, ElementRef, HostListener, OnInit, ViewChild  } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { Position } from "../../../../common/images/position";
import { GameplayService } from "../gameplay.service";

@Component({
    selector: "app-gameplay-view",
    templateUrl: "./gameplay-view.component.html",
    styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public readonly nbPlayers: number;
    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly CORRECT_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    private readonly WRONG_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Wrong-answer.mp3");

    public foundDifferencesCounter: number;
    public images: string[];
    public requiredDifferences: number;
    public type: GameType;
    public canClick: boolean;
    public isErrorMessageVisible: boolean;
    public clickPosition: Position;
    public chrono: number;
    private isChronoRunning: boolean;

    @ViewChild("container") private containerRef: ElementRef;

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
        this.canClick = true;
        this.isErrorMessageVisible = false;
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
            this.startChrono();
        });
        const SOUND_VOLUME: number = 0.2;
        this.CORRECT_SOUND.volume = SOUND_VOLUME;
        this.WRONG_SOUND.volume = SOUND_VOLUME;
    }

    @HostListener("click", ["$event"])
    public mouseClicked(mouseEvent: MouseEvent): void {
        if (this.canClick) {
            this.clickPosition = {i: mouseEvent.x, j: mouseEvent.y};
        }
    }

    public updateGameplay(): void {
        this.foundDifferencesCounter ++;
        if (this.foundDifferencesCounter === this.requiredDifferences) {
            this.isChronoRunning = false;
            this.canClick = false;
        }
        this.playCorrectSound();
    }

    private playCorrectSound(): void {
        this.CORRECT_SOUND.currentTime = 0;
        this.CORRECT_SOUND.play().catch((err: Error) => {
            console.error(err);
        });
    }

    public identificationError(): void {
        if (this.foundDifferencesCounter !== this.requiredDifferences) {
            this.showErrorMessage();
            this.showCursorError();
            this.playWrongSound();
        }
    }
    private showErrorMessage(): void {
        const ONE_SECOND: number = 1000;
        this.isErrorMessageVisible = true;
        setTimeout(
            () => {
                this.isErrorMessageVisible = false;
            },
            ONE_SECOND);
    }

    private showCursorError(): void {
        const ONE_SECOND: number = 1000;
        const NORMAL_CURSOR: string = "context-menu";
        const ERROR_CURSOR: string = "not-allowed";
        this.containerRef.nativeElement.style.cursor = ERROR_CURSOR;
        this.canClick = false;
        setTimeout(
            () => {
                this.containerRef.nativeElement.style.cursor = NORMAL_CURSOR;
                this.canClick = true;
            },
            ONE_SECOND);
    }

    private playWrongSound(): void {
        this.WRONG_SOUND.currentTime = 0;
        this.WRONG_SOUND.play().catch((err: Error) => {
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
