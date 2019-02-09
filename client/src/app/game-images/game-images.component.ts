import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-game-images",
  templateUrl: "./game-images.component.html",
  styleUrls: ["./game-images.component.css"],
})
export class GameImagesComponent implements OnInit {
    @Input() public images: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
