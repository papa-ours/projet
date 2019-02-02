import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Message } from "../../../../common/communication/message";
import { DifferenceImageService } from "../difference-image.service";
import { FormValidationService } from "../form-validation.service";
import { FileReaderUtil } from "./file-reader.util";

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

export class SimpleGameCreationComponent implements OnInit {
  private name: string = "";
  private readonly N_IMAGES: number = 2;
  private imageFiles: File[] = new Array<File>(this.N_IMAGES);
  private imagesData: Uint8Array[] = [];
  // @ts-ignore
  private errorMessage: string = "";
  @Output() public closeForm: EventEmitter <boolean> = new EventEmitter();

  public constructor(private differenceImageService: DifferenceImageService,
                     private fileReaderUtil: FileReaderUtil,
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
    formData.append("originalImage", this.imagesData[ImageType.ORIGINAL].toString());
    formData.append("modifiedImage", this.imagesData[ImageType.MODIFIED].toString());

    this.differenceImageService.postDifferenceImageData(formData)
      .subscribe((message: Message) => {
        //TODO: supprimer avant la remise
        const image: HTMLImageElement = document.getElementById("image") as HTMLImageElement;
        const myRawData: number[] = message.body.split(",").map(Number);
        const myData: string[] = myRawData.map((x) => String.fromCharCode(x));
        image.src = "data:image/bmp;base64," + btoa(myData.join(""));
      });
  }

  // @ts-ignore
  private submitForm(): void {
    let readFiles: number = 0;
    if (this.allValuesEntered) {
      this.imageFiles.forEach((file: File, index: number) => {
        this.fileReaderUtil.readFile(file)
          .subscribe((event: Event) => {
              const eventTarget: FileReaderEventTarget = event.target as FileReaderEventTarget;
              this.imagesData[index] = new Uint8Array(eventTarget.result);
              try {
                this.errorMessage = "";
                if (++readFiles === this.imageFiles.length &&
                    this.formValidationService.isImageDimensionValid(this.imagesData[index])) {
                    this.sendForm();
                }
              } catch (error) {
                this.errorMessage = error.message;
              }
          });
      });
    }
  }
}
