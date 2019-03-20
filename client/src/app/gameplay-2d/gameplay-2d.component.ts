import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { VectorInterface } from "../../../../common/communication/vector-interface";
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
    @Input() private canClick: boolean;
    public imagesUrl: string[];
    public type: GameType;
    private foundDifferencesCounter: number;
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    @Output() public errorIdentificationEvent: EventEmitter<void>;

    public constructor(
        private differenceCheckerService: DifferenceCheckerService,
    ) {
        this.imagesUrl = [];
        this.foundDifferencesCounter = 0;
        this.foundDifferenceEvent = new EventEmitter<void>();
        this.errorIdentificationEvent = new EventEmitter<void>();
    }
    public ngOnInit(): void {
        this.setImagesPath();
    }

    private setImagesPath(): void {
        this.imagesUrl[ImageType.Original] = `${SERVER_ADDRESS}/${this.name}-originalImage.bmp`;
        this.imagesUrl[ImageType.Modified] = `${SERVER_ADDRESS}/${this.name}-modifiedImage.bmp`;
    }

    public checkDifference(position: VectorInterface): void {
        if (this.canClick) {
            this.differenceCheckerService.isPositionDifference(this.id, position.x, position.y)
                .subscribe((isDifference: boolean) => {
                    isDifference ? this.differenceFound() : this.errorIdentificationEvent.emit();
                },
            );
        }
    }

    private differenceFound(): void {
        this.foundDifferencesCounter++;
        this.foundDifferenceEvent.emit();
        this.updateDifferenceImage();
    }

    private updateDifferenceImage(): void {
        this.imagesUrl[ImageType.Modified] = `${SERVER_ADDRESS}/${this.id}.bmp?${this.foundDifferencesCounter}`;
    }

}
