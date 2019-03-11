import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { ImageType } from "../../../../common/images/image-type";
import { DifferenceCheckerService } from "../difference-checker.service";

@Component({
  selector: "app-gameplay-2d",
  templateUrl: "./gameplay-2d.component.html",
  styleUrls: ["./gameplay-2d.component.css"],
})
export class Gameplay2DComponent implements OnInit {

    @Input() private name: string;
    @Input() private id: string;
    public images: string[];
    public type: GameType;
    private foundDifferencesCounter: number;
    @Output() public foundDifferenceEvent: EventEmitter<void>;

    public constructor(
        private differenceCheckerService: DifferenceCheckerService,
    ) {
        this.images = [];
        this.foundDifferencesCounter = 0;
        this.foundDifferenceEvent = new EventEmitter<void>();
    }
    public ngOnInit(): void {
        this.setImagesPath();
    }

    private setImagesPath(): void {
        this.images[ImageType.Original] = `${SERVER_ADDRESS}/${this.name}-originalImage.bmp`;
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: [number, number]): void {
        this.differenceCheckerService.isPositionDifference(this.id, position[0], position[1])
            .subscribe((isDifference: boolean) => {
                if (isDifference) {
                    this.differenceFound();
                }
            },
        );
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.foundDifferenceEvent.emit();
        this.updateDifferenceImage();

    }

    private updateDifferenceImage(): void {
        this.images[ImageType.Modified] = `${SERVER_ADDRESS}/${this.id}.bmp?${this.foundDifferencesCounter}`;
    }

}
