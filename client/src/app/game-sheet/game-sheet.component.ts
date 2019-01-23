import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css']
})
export class GameSheetComponent implements OnInit {

  @Input() private description: GameSheetDescription;
  @Input() private privilege: "admin" | "user";
  @ViewChild('btn1') btn1: ElementRef;
  @ViewChild('btn2') btn2: ElementRef;

  public constructor() {
  }

  ngOnInit() {
    this.btn1.nativeElement.textContent = this.privilege === "user" ? "Jouer" : "Supprimer";
    this.btn2.nativeElement.textContent = this.privilege === "user" ? "Créer" : "Réinitialiser";
  }

}
