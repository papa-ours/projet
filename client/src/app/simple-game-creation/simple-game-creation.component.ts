import { Component, OnInit } from '@angular/core';

interface FileReaderEventTarget extends EventTarget {
  result: string;
  files: FileList;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
}

@Component({
  selector: 'app-simple-game-creation',
  templateUrl: './simple-game-creation.component.html',
  styleUrls: ['./simple-game-creation.component.css']
})

export class SimpleGameCreationComponent implements OnInit {
  
  private imageData: Uint8Array;
  constructor() { }

  ngOnInit() {
  }

  private fileEntered(event: FileReaderEvent): void {
    const reader: FileReader = new FileReader();
    reader.onload = (): void => {
      const data: ArrayBuffer = reader.result;
      this.imageData = new Uint8Array(data);
    };

    reader.readAsArrayBuffer(event.target.files[0]);
  }
}
