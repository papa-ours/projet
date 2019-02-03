import { Component, Input, OnInit } from "@angular/core";
import { GameSheetDescription } from "../../../../common/communication/game-description";
//@ts-ignore
import { GameListService } from "../game-list-getter.service"
import { Privilege } from "../privilege";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.component.html",
  styleUrls: ["./game-list.component.css"],
})
export class GameListComponent implements OnInit {
  //@ts-ignore
  @Input() private is2D: boolean;
  @Input() private descriptions: GameSheetDescription[];
  //@ts-ignore
  @Input() private privilege: Privilege;

  public ngOnInit(): void {
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
