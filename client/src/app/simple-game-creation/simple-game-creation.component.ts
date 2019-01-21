import { Component, OnInit } from '@angular/core';
import { DifferenceImageService } from '../difference-image.service';
import { Message } from '../../../../common/communication/message';

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
  selector: 'app-simple-game-creation',
  templateUrl: './simple-game-creation.component.html',
  styleUrls: ['./simple-game-creation.component.css']
})

export class SimpleGameCreationComponent implements OnInit {
  private name: string;
  private readonly N_IMAGES: number = 2;
  private imageFiles: File[] = new Array<File>(this.N_IMAGES);
  private imagesData: Uint8Array[] = [];

  constructor(private differenceImageService: DifferenceImageService) { }

  ngOnInit() {
  }

  // @ts-ignore
  private fileEntered(event: FileReaderEvent, type: ImageType): void {
    if (type < this.N_IMAGES) {
      this.imageFiles[type] = event.target.files[0];
    }
  }

  private get allValuesEntered(): boolean {
    return (
      this.name !== undefined &&
      this.imageFiles[ImageType.ORIGINAL] !== undefined &&
      this.imageFiles[ImageType.MODIFIED] !== undefined
    );
  }

  private readFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      const data: ArrayBuffer = reader.result;
      const imageData: Uint8Array = new Uint8Array(data);
      this.imagesData.push(imageData);
      if (this.imagesData.length === this.N_IMAGES) {
        this.sendForm();
      }
    };

    reader.readAsArrayBuffer(file);
  }

  private sendForm(): void {
    const formData: FormData = new FormData();

    formData.append("name", this.name);
    formData.append("originalImage", this.imagesData[ImageType.ORIGINAL]);
    formData.append("modifiedImage", this.imagesData[ImageType.MODIFIED]);

    this.differenceImageService.postDifferenceImageData(formData)
      .subscribe((message: Message) => message.body);
  }

  // @ts-ignore
  private submitForm(): void {
    if (this.allValuesEntered) {
      this.imageFiles.forEach((file) => this.readFile(file));
    }
  }
}
