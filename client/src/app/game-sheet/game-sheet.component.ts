import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameSheet, GameType } from "../../../../common/communication/game-description";

@Component({
    selector: "app-game-sheet",
    templateUrl: "./game-sheet.component.html",
    styleUrls: ["./game-sheet.component.css"],
})
export class GameSheetComponent implements OnInit {
    public constructor(private router: Router) {}
    public source: string = "";
    public readonly medalColors: string[] = [
        "#FFD700",
        "#C0C0C0",
        "#CD7F32",
    ];
    @Input() public type: GameType;
    @Input() public description: GameSheet;
    @Input() private isAdmin: boolean = false;
    @ViewChild("btn1") private btn1: ElementRef;
    @ViewChild("btn2") private btn2: ElementRef;

    public ngOnInit(): void {
        const SERVER_URL: string = "http://localhost:3000";
        this.source = `${SERVER_URL}/${this.description.name}-originalImage.bmp`;
        this.btn1.nativeElement.textContent = this.isAdmin ? "Supprimer" : "Jouer";
        this.btn2.nativeElement.textContent = this.isAdmin ? "Réinitialiser" : "Créer";
    }

    public play(): void {
        if (!this.isAdmin) {
            this.router.navigateByUrl(`/game/${this.description.name}/${this.type}`)
            .catch((err: Error) => {
                console.error(err);
            });
        }
    }

}
