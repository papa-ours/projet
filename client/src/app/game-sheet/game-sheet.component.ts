import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameSheet } from "../../../../common/communication/game-description";
import { Privilege } from "../privilege";

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
    @Input() public description: GameSheet;
    @Input() private privilege: Privilege = Privilege.USER;
    @ViewChild("btn1") private btn1: ElementRef;
    @ViewChild("btn2") private btn2: ElementRef;

    public ngOnInit(): void {
        const SERVER_URL: string = "http://localhost:3000";
        this.source = `${SERVER_URL}/${this.description.name}-originalImage.bmp`;
        // === doesn't work, even with explicit type conversions.
        // tslint:disable-next-line:triple-equals
        const isUser: boolean = this.privilege == Privilege.USER;
        this.btn1.nativeElement.textContent = isUser ? "Jouer" : "Supprimer";
        this.btn2.nativeElement.textContent = isUser ? "Créer" : "Réinitialiser";
    }

    // @ts-ignore
    private play(): void {
        this.router.navigateByUrl(`/gameplaySimplePOV/${this.description.name}/${this.description.id}`)
        .catch((err: Error) => {
            console.error(err);
        });
    }

}
