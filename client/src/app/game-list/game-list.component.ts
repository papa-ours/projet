import { Component, OnInit, Input } from '@angular/core';
import { GameSheetDescription } from "../../../../common/communication/game-description";
import { GameListService } from "../game-list-getter.service"

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  
  //@ts-ignore
  private descriptions: GameSheetDescription[];
  @Input() private is2D: boolean;
  //@ts-ignore
  @Input() private privilege: "admin" | "user";
  constructor(private gameListService: GameListService) { }

  ngOnInit() {
    this.gameListService.getGameList().subscribe((lists) => {
      console.log(lists);
      this.descriptions = this.is2D ? lists.list2d : lists.list3d;
      this.encodeImages();
    });
  }

  private encodeImages(): void {
    this.descriptions.forEach((description: GameSheetDescription) => {
      description.preview = this.encodeImage(description.preview);
    });
  }

  private encodeImage(imageData: string): string {
    const numberData: number[] = imageData.split(",").map(Number);
    const encodedString: string[] = numberData.map((val: number) => String.fromCharCode(val));

    return "data:image/bmp;base64," + btoa(encodedString.join(""));
  }

}
