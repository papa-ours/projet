import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { GameplayService } from "../gameplay.service";

@Component({
  selector: "app-gameplay-view",
  templateUrl: "./gameplay-view.component.html",
  styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public hourglassIcon: IconDefinition = faHourglassHalf;
    private id: string;
    public images: string[];

    public constructor(private route: ActivatedRoute, private gameplayService: GameplayService) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.getGameplayImages();
        });
    }

    private getGameplayImages(): void {
        this.gameplayService.getGameplayImages(this.id).subscribe((images: string[]) => {
            if (images.length) {
                this.images = images.map((imageData: string) => {
                    return this.encodeImage(imageData);
                });
            }
        });
    }

    private encodeImage(imageData: string): string {
        const numberData: number[] = imageData.split(",").map(Number);
        const encodedString: string[] = numberData.map((val: number) => String.fromCharCode(val));

        return "data:image/bmp;base64," + btoa(encodedString.join(""));
    }
}
