import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DifferenceCheckerService } from "../difference-checker.service";
import { GameplayService } from "../gameplay.service";
import { Game } from "./game";

@Component({
  selector: "app-gameplay-view",
  templateUrl: "./gameplay-view.component.html",
  styleUrls: ["./gameplay-view.component.css"],
})
export class GameplayViewComponent implements OnInit {

    public hourglassIcon: IconDefinition = faHourglassHalf;
    public foundDifferencesCounter: number = 0;
    private id: string;
    public images: string[] = [];

    public constructor( private route: ActivatedRoute, 
                        private gameplayService: GameplayService,
                        private differenceCheckerService: DifferenceCheckerService) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params["id"];
            this.getGameplayImages();
        });
    }

    private getGameplayImages(): void {
        this.gameplayService.getGameplayImages(this.id).subscribe((images: string[]) => {
            if (images.length) {
                const game: Game = new Game(images);
                this.images[0] = game.originalImage.encode();
                this.images[1] = game.modifiedImage.encode();
            }
        });
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
            .subscribe((image: string) => {
                if (image.length) {
                    this.foundDifferencesCounter++;

                    const sound: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
                    sound.play();

                    this.images[1] = this.encodeImage(image);
                }
            });
    }

    private encodeImage(imageData: string): string {
        const numberData: number[] = imageData.split(",").map(Number);
        const encodedString: string[] = numberData.map((val: number) => String.fromCharCode(val));

        return "data:image/bmp;base64," + btoa(encodedString.join(""));
    }
}
