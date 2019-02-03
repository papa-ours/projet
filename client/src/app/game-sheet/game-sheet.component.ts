import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { GameSheetDescription } from "../../../../common/communication/game-description";

@Component({
  selector: "app-game-sheet",
  templateUrl: "./game-sheet.component.html",
  styleUrls: ["./game-sheet.component.css"]
})
export class GameSheetComponent implements OnInit {

  // @ts-ignore
  private medalColors: string[] = [
    "#FFD700",
    "#C0C0C0",
    "#CD7F32",
  ];
  // @ts-ignore
  @Input() private description: GameSheetDescription;
  @Input() private privilege: "admin" | "user";
  @ViewChild("btn1") private btn1: ElementRef;
  @ViewChild("btn2") private btn2: ElementRef;

  public ngOnInit(): void {
    this.btn1.nativeElement.textContent = this.privilege === "user" ? "Jouer" : "Supprimer";
    this.btn2.nativeElement.textContent = this.privilege === "user" ? "Créer" : "Réinitialiser";
  }

}
