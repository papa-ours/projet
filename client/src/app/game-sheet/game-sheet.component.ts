import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { S3_BUCKET_URL } from "../../../../common/communication/constants";
import { GameMode, GameSheet, GameType } from "../../../../common/communication/game-description";
import { ImageTypeName } from "../../../../common/images/image-type";
import { ConnectionService } from "../connection.service";
import { GameSheetService } from "../game-sheet.service";
import { GameplayService } from "../gameplay.service";
import { SocketService } from "../socket.service";

@Component({
    selector: "app-game-sheet",
    templateUrl: "./game-sheet.component.html",
    styleUrls: ["./game-sheet.component.css"],
})
export class GameSheetComponent implements OnInit {
    public source: string;
    public readonly medalColors: string[] = [
        "#FFD700",
        "#C0C0C0",
        "#CD7F32",
    ];
    public isConfirmPanelShown: boolean;
    public actionMessage: string;
    @Input() public type: GameType;
    @Input() public description: GameSheet;
    @Input() public isAdmin: boolean;
    @Input() public canPlay: boolean;
    @Output() public loadGame: EventEmitter<void>;
    public loading: boolean;

    public constructor(
        private router: Router,
        private gameSheetService: GameSheetService,
        private gameplayService: GameplayService,
        private connectionService: ConnectionService,
        private socketSerivce: SocketService,
    ) {
        this.source = "";
        this.isAdmin = false;
        this.isConfirmPanelShown = false;
        this.loading = false;
        this.loadGame = new EventEmitter();
    }

    public ngOnInit(): void {
        if (this.type === GameType.Simple) {
            this.source = `${S3_BUCKET_URL}/${this.description.name}-${ImageTypeName.Original}.bmp`;
        }

        this.socketSerivce.getGameCreated(this.description.id).subscribe((status: boolean) => {
            this.description.hasWaitingRoom = status;
        });
    }

    public delete(): void {
        this.gameSheetService.deleteGameSheet(this.description.id, this.type)
                .subscribe(() => {
                    location.reload();
                });
    }

    public reinitializeScores(): void {
        this.gameSheetService.reinitializeScores(this.description.id, this.type)
            .subscribe(() => {
                location.reload();
            });
    }

    public showConfirmPanel(message: string): void {
        this.isConfirmPanelShown = true;
        this.actionMessage = message;
    }

    public play(): void {
        this.loading = true;
        this.loadGame.emit();
        this.gameplayService.getGameId(this.description.name, this.type, GameMode.Solo, this.connectionService.username)
        .subscribe((id: string) => {
            this.router.navigateByUrl(`/game/${this.description.name}/${this.type}/${GameMode.Solo}/${id}`)
                .catch((err: Error) => {
                    console.error(err);
                });
        });
    }

    public playMultiplayerGame(): void {
        this.router.navigateByUrl(`/matchmaking/${this.description.name}/${this.type}/${this.description.hasWaitingRoom}`)
            .catch((error: Error) => console.error(error.message));
    }

    public actionConfirmed(isActionConfirmed: boolean): void {
        if (isActionConfirmed) {
            this.actionMessage === "supprimer" ? this.delete() : this.reinitializeScores();
        }

        this.isConfirmPanelShown = false;
    }
}
