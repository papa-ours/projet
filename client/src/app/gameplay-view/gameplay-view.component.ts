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
    private name: string;
    private id: string;
    private game: Game;
    public images: string[] = [];

    public constructor( private route: ActivatedRoute,
                        private differenceCheckerService: DifferenceCheckerService,
                        ) { }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.id = params["id"];
            this.setupImages();
        });
    }

    private setupImages(): void {
        const SERVER_URL: string = "http://localhost:3000";
        this.images[0] = `${SERVER_URL}/${this.name}-originalImage.bmp`;
        this.images[1] = `${SERVER_URL}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.name, position[0], position[1])
            .subscribe((isDifference: boolean) => {
                if (isDifference) {
                    this.foundDifferencesCounter++;
                    // this.game.restoreModifiedImage(position[0], position[1]);
                    const sound: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
                    sound.play();

                    // this.images[1] = this.game.modifiedImage.encode();
                }
            });
    }
}
