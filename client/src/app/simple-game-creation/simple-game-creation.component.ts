import { Component, EventEmitter, Output } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { ImageTypeName } from "../../../../common/images/image-type";
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

    private readonly N_IMAGES: number = 2;
    public readonly OPTION_MIN_NAME_LENGTH: number = 5;
    public readonly OPTION_MAX_NAME_LENGTH: number = 15;
    public loading: boolean;

    private name: string;
    private imageFiles: File[];
    public errorMessage: string;

    @Output()
    public closeForm: EventEmitter<boolean>;

    public constructor(
        private differenceImageService: DifferenceImageService,
        private formValidationService: FormValidationService,
    ) {
        this.loading = false;
        this.name = "";
        this.imageFiles = new Array<File>(this.N_IMAGES);
        this.errorMessage = "";
        this.closeForm = new EventEmitter();
    }

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
        formData.append(ImageTypeName.Original, this.imageFiles[ImageType.ORIGINAL], `${ImageTypeName.Original}.bmp`);
        formData.append(ImageTypeName.Modified, this.imageFiles[ImageType.MODIFIED], `${ImageTypeName.Modified}.bmp`);
        this.loading = true;

        this.differenceImageService.postDifferenceImageData(formData)
            .subscribe((message: Message) => {
                if (message.body !== "") {
                    this.errorMessage = message.body;
                } else {
                    this.close();
                    location.reload();
                }
            });
    }

    public submitForm(): void {
        if (this.allValuesEntered) {
            this.sendForm();
        }
    }
}
