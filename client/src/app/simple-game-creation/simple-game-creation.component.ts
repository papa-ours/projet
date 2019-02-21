import { Component, EventEmitter, Output } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { DifferenceImageService } from "../difference-image.service";
import { FormValidationService } from "../form-validation.service";

interface FileReaderEventTarget extends EventTarget {
    result: ArrayBuffer;
    files: FileList;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
}

enum ImageType {
    ORIGINAL,
    MODIFIED,
}

@Component({
    selector: "app-simple-game-creation",
    templateUrl: "./simple-game-creation.component.html",
    styleUrls: ["./simple-game-creation.component.css"],
})

export class SimpleGameCreationComponent {
    private name: string = "";
    private readonly N_IMAGES: number = 2;
    private imageFiles: File[] = new Array<File>(this.N_IMAGES);
    public errorMessage: string = "";

    @Output()
    public closeForm: EventEmitter<boolean> = new EventEmitter();

    public constructor(
        private differenceImageService: DifferenceImageService,
        private formValidationService: FormValidationService,
    ) {}

    public close(): void {
        this.closeForm.emit(false);
    }

    public fileEntered(event: FileReaderEvent, type: ImageType): void {
        if (type < this.N_IMAGES) {
            this.imageFiles[type] = event.target.files[0];
        }
    }

    private get allValuesEntered(): boolean {
        const originalImage: File = this.imageFiles[ImageType.ORIGINAL];
        const modifiedImage: File = this.imageFiles[ImageType.MODIFIED];
        let allValuesEntered: boolean = false;
        try {
            this.errorMessage = "";
            allValuesEntered = this.formValidationService.isFormValid(this.name, originalImage, modifiedImage);
        } catch (error) {
            this.errorMessage = error.message;
        }

        return allValuesEntered;
    }

    private sendForm(): void {
        const formData: FormData = new FormData();
        formData.append("name", this.name);
        formData.append("originalImage", this.imageFiles[ImageType.ORIGINAL], "originalImage.bmp");
        formData.append("modifiedImage", this.imageFiles[ImageType.MODIFIED], "modifiedImage.bmp");

        this.differenceImageService.postDifferenceImageData(formData)
            .subscribe((message: Message) => {
                if (message.body !== "") {
                    this.errorMessage = message.body;
                } else {
                    this.close();
                }
            });
    }

    // @ts-ignore
    private submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }
}
