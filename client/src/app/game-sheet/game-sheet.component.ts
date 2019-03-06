import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameSheet, GameType } from "../../../../common/communication/game-description";
import { DeleteGameSheetService } from "../delete-game-sheet.service";

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
    @Input() public type: GameType;
    @Input() public description: GameSheet;
    @Input() private isAdmin: boolean;
    @ViewChild("btn1") private btn1: ElementRef;
    @ViewChild("btn2") private btn2: ElementRef;

    public constructor(private router: Router, private deleteGameSheetService: DeleteGameSheetService) {
        this.source = "";
        this.isAdmin = false;
    }

    public ngOnInit(): void {
        if (this.type === GameType.Simple) {
            this.source = `${SERVER_ADDRESS}/${this.description.name}-originalImage.bmp`;
        }
        this.btn1.nativeElement.textContent = this.isAdmin ? "Supprimer" : "Jouer";
        this.btn2.nativeElement.textContent = this.isAdmin ? "Réinitialiser" : "Créer";
    }

    public play(): void {
        if (this.isAdmin) {
            this.deleteGameSheetService.deleteGameSheet(this.description.id, this.type)
                .subscribe(() => {
                    location.reload();
                });
        } else {
            this.router.navigateByUrl(`/game/${this.description.name}/${this.type}`)
            .catch((err: Error) => {
                console.error(err);
            });
        }
    }

}
