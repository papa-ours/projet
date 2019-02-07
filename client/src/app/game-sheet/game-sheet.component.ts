import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { Privilege } from "../privilege";

@Component({
    selector: "app-game-sheet",
    templateUrl: "./game-sheet.component.html",
    styleUrls: ["./game-sheet.component.css"],
})
export class GameSheetComponent implements OnInit {
    public constructor(
        private router: Router,
    ) { }

    // @ts-ignore
    private medalColors: string[] = [
        "#FFD700",
        "#C0C0C0",
        "#CD7F32",
    ];
    // @ts-ignore
    @Input() private description: GameSheetDescription;
    @Input() private privilege: Privilege = Privilege.USER;
    @ViewChild("btn1") private btn1: ElementRef;
    @ViewChild("btn2") private btn2: ElementRef;

    public ngOnInit(): void {
        // === doesn't work, even with explicit type conversions.
        // tslint:disable-next-line:triple-equals
        const isUser: boolean = this.privilege == Privilege.USER;
        this.btn1.nativeElement.textContent = isUser ? "Jouer" : "Supprimer";
        this.btn2.nativeElement.textContent = isUser ? "Créer" : "Réinitialiser";
    }

    // @ts-ignore
    private play(): void {
        this.router.navigateByUrl("/gameplaySimplePOV")
        .catch((err: Error) => {
            console.error(err);
        });
    }

}
