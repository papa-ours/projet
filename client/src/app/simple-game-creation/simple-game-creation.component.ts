import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { DifferenceImageService } from "../difference-image.service";
import { FormValidationService } from "../form-validation.service";

interface FileReaderEventTarget extends EventTarget {
  result: string;
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

export class SimpleGameCreationComponent implements OnInit {
  private name: string;
  private readonly N_IMAGES: number = 2;
  private imageFiles: File[] = new Array<File>(this.N_IMAGES);
  private imagesData: Uint8Array[] = [];
  @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();

  public constructor(private differenceImageService: DifferenceImageService,
                     private formValidationService: FormValidationService) { }

  public close(): void {
    this.closeForm.emit(false);
  }

  public ngOnInit(): void {}

  // @ts-ignore
  private fileEntered(event: FileReaderEvent, type: ImageType): void {
    if (type < this.N_IMAGES) {
      this.imageFiles[type] = event.target.files[0];
    }
  }

  private get allValuesEntered(): boolean {
    const originalImage: File = this.imageFiles[ImageType.ORIGINAL];
    const modifiedImage: File = this.imageFiles[ImageType.MODIFIED];

    return this.formValidationService.isFormValide(this.name, originalImage, modifiedImage);
  }

  private readFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      const data: ArrayBuffer = reader.result as ArrayBuffer;
      if (typeof(data !== null)) {
        const imageData: Uint8Array = new Uint8Array(data);
        this.imagesData.push(imageData);
        if (this.imagesData.length === this.N_IMAGES) {
          this.sendForm();
        }
      }
    };

    reader.readAsArrayBuffer(file);
  }

  private sendForm(): void {
    const formData: FormData = new FormData();

    formData.append("name", this.name);
    formData.append("originalImage", this.imagesData[ImageType.ORIGINAL].toString());
    formData.append("modifiedImage", this.imagesData[ImageType.MODIFIED].toString());

    this.differenceImageService.postDifferenceImageData(formData)
      .subscribe((message: Message) => console.log(message));
  }

  // @ts-ignore
  private submitForm(): void {
    if (this.allValuesEntered) {
      this.imageFiles.forEach((file) => this.readFile(file));
    }
  }
}
