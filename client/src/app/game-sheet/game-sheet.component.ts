import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { Privilege } from "../../../../common/communication/game-description";
@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css']
})
export class GameSheetComponent implements OnInit {
  //@ts-ignore
  private medalColors: string[] = [
    "#FFD700",
    "#C0C0C0",
    "#CD7F32",
  ];
  //@ts-ignore
  @Input() private description: GameSheetDescription;
  @Input() private privilege : Privilege = Privilege.USER;
  @ViewChild('btn1') btn1: ElementRef;
  @ViewChild('btn2') btn2: ElementRef;

  public constructor() {
  }

  ngOnInit() {
    this.btn1.nativeElement.textContent = this.privilege == Privilege.USER ? "Jouer" : "Supprimer";
    this.btn2.nativeElement.textContent = this.privilege == Privilege.USER ? "Créer" : "Réinitialiser";
  }

}
