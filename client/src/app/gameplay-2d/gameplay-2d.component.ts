import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { REQUIRED_DIFFERENCES_1P, S3_BUCKET_URL, SERVER_ADDRESS } from "../../../../common/communication/constants";
import { GameType } from "../../../../common/communication/game-description";
import { VectorInterface } from "../../../../common/communication/vector-interface";
import { ImageType, ImageTypeName } from "../../../../common/images/image-type";
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
    @Output() public foundDifferenceEvent: EventEmitter<void>;
    @Output() public errorIdentificationEvent: EventEmitter<void>;

    @Input() public set foundDifferencesCounter(counter: number) {
        this.imagesUrl[ImageType.Modified] = counter === REQUIRED_DIFFERENCES_1P ?
            `${S3_BUCKET_URL}/${this.name}-${ImageTypeName.Original}.bmp` :
            `${SERVER_ADDRESS}/${this.id}.bmp?${counter}`;
    }

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
        this.imagesUrl[ImageType.Original] = `${S3_BUCKET_URL}/${this.name}-${ImageTypeName.Original}.bmp`;
        this.imagesUrl[ImageType.Modified] = `${S3_BUCKET_URL}/${this.name}-${ImageTypeName.Modified}.bmp`;
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
        this.foundDifferenceEvent.emit();
    }

}
