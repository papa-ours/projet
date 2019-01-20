import { Component, OnInit } from '@angular/core';

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
  private readonly N_IMAGES: number = 2;
  private imagesData: Uint8Array[] = new Array<Uint8Array>(this.N_IMAGES);

  constructor() { }

  ngOnInit() {
  }

  private fileEntered(event: FileReaderEvent, type: ImageType): void {
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      const data: ArrayBuffer = reader.result;
      this.imagesData[type] = new Uint8Array(data);
      this.getDifferenceImage();
    };

    reader.readAsArrayBuffer(event.target.files[0]);
  }

  private get bothImagesEntered(): boolean {
    return ((this.imagesData[ImageType.ORIGINAL] !== undefined) &&
            (this.imagesData[ImageType.MODIFIED] !== undefined));
  }

  private getDifferenceImage(): void {
    if (this.bothImagesEntered) {
      //TODO: Get Difference Image from Service
    }
  }
}
