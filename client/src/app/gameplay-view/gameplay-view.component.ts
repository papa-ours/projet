import { Component, ElementRef, HostListener, OnInit, ViewChild  } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { REQUIRED_DIFFERENCES_1P, REQUIRED_DIFFERENCES_2P } from "../../../../common/communication/constants";
import { GameMode, GameType } from "../../../../common/communication/game-description";
import { ChatMessage } from "../../../../common/communication/message";
import { Position } from "../../../../common/images/position";
import { ConnectionService } from "../connection.service";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-gameplay-view",
    templateUrl: "./gameplay-view.component.html",
    styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public gameMode: GameMode;
    public readonly hourglassIcon: IconDefinition = faHourglassHalf;
    private readonly CORRECT_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
    private readonly WRONG_SOUND: HTMLAudioElement = new Audio("../../../assets/sound/Wrong-answer.mp3");
    private readonly ERROR_TIMEOUT: number = 1000;

    public totalDifferenceCounter: number;
    public foundDifferencesCounters: number[];
    public finished: boolean;
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
        private router: Router,
        private socketService: SocketService,
        public name: string,
        public id: string,
        private connectionService: ConnectionService,
    ) {
        this.foundDifferencesCounters = [];
        this.images = [];
        this.canClick = true;
        this.isErrorMessageVisible = false;
        this.chrono = 0;
        this.isChronoRunning = false;
        this.totalDifferenceCounter = 0;
        this.finished = false;

        if (!this.connectionService.connected) {
            this.router.navigateByUrl("/");
        }

        this.socketService.getChatMessage().subscribe((message: ChatMessage) => {
            if (!message.text.includes("Erreur")) {
                this.updateDifferenceCounters(this.connectionService.username === message.username ? 0 : 1);
            }
        });
    }

    private static playSound(sound: HTMLAudioElement): void {
        sound.currentTime = 0;
        sound.play().catch((err: Error) => {
            console.error(err);
        });
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.type = params["type"];
            this.id = params["id"];
            this.gameMode = params["mode"];
            this.requiredDifferences = this.gameMode == GameMode.Solo ? REQUIRED_DIFFERENCES_1P : REQUIRED_DIFFERENCES_2P;
            this.foundDifferencesCounters = this.gameMode == GameMode.Solo ? [0] : [0, 0];
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
        this.socketService.sendFoundDiffrenceMessage(this.id, this.gameMode);
        GameplayViewComponent.playSound(this.CORRECT_SOUND);
    }

    public updateDifferenceCounters(index: number): void {
        this.foundDifferencesCounters[index]++;
        this.totalDifferenceCounter++;
        if (this.foundDifferencesCounters.indexOf(this.requiredDifferences) !== -1) {
            this.isChronoRunning = false;
            this.canClick = false;
            this.finished = true;
        }
    }

    public identificationError(): void {
        if (this.foundDifferencesCounters.indexOf(this.requiredDifferences) === -1) {
            this.socketService.sendErrorIdentificationMessage(this.id, this.gameMode);
            this.showErrorMessage();
            this.showCursorError();
            GameplayViewComponent.playSound(this.WRONG_SOUND);
        }
    }
    private showErrorMessage(): void {
        this.isErrorMessageVisible = true;
        setTimeout(
            () => {
                this.isErrorMessageVisible = false;
            },
            this.ERROR_TIMEOUT);
    }

    private showCursorError(): void {
        const NORMAL_CURSOR: string = "context-menu";
        const ERROR_CURSOR: string = "not-allowed";
        this.containerRef.nativeElement.style.cursor = ERROR_CURSOR;
        this.canClick = false;
        setTimeout(
            () => {
                this.containerRef.nativeElement.style.cursor = NORMAL_CURSOR;
                this.canClick = true;
            },
            this.ERROR_TIMEOUT);
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
