import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { faHourglassHalf, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ImageType } from "../../../../common/images/image-type";
import { DifferenceCheckerService } from "../difference-checker.service";
import { GameplayService } from "../gameplay.service";

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
    public images: string[] = [];
    private readonly SERVER_URL: string = "http://localhost:3000";
    public readonly nbPlayers: number = 1;
    public requiredDifferences: number;

    public constructor( private route: ActivatedRoute,
                        private differenceCheckerService: DifferenceCheckerService,
                        private gameplayService: GameplayService,
                        ) {
                            const ONE_PLAYER_REQUIRED_DIFFERENCES: number = 7;
                            const TWO_PLAYERS_REQUIRED_DIFFERENCES: number = 4;
                            this.requiredDifferences = this.nbPlayers === 1 ?
                                                    ONE_PLAYER_REQUIRED_DIFFERENCES :
                                                    TWO_PLAYERS_REQUIRED_DIFFERENCES;
                         }

    public ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.name = params["name"];
            this.gameplayService.getGameId(this.name).subscribe((id: string) => {
                this.id = id;
            });
            this.setupImages();
        });
    }

    private setupImages(): void {
        this.images[ImageType.Original] = `${this.SERVER_URL}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${this.SERVER_URL}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
            .subscribe((isDifference: boolean) => {
                if (isDifference) {
                    this.foundDifferencesCounter++;
                    const sound: HTMLAudioElement = new Audio("../../../assets/sound/Correct-answer.ogg");
                    sound.play();

                    this.images[ImageType.Modified] = `${this.SERVER_URL}/${this.id}.bmp?${this.foundDifferencesCounter}` ;
                }
            });
    }
}
