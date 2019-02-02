import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormValidationService {
  private readonly NAME_MIN_SIZE: number = 5;
  private readonly NAME_MAX_SIZE: number = 15;
  private readonly FILE_TYPE: string = "image/bmp";
  private readonly IMAGE_WIDTH: number = 640;
  private readonly IMAGE_HEIGHT: number = 480;
  public constructor() { }

  private validateName( name: string): boolean {
    return name !== undefined &&
           name.length >= this.NAME_MIN_SIZE &&
           name.length <= this.NAME_MAX_SIZE;
  }
  private isBMP(file: File): boolean {
    if (file === undefined) {
      throw(new Error("The files should not be empty"));
    }
    if ( file.type !== this.FILE_TYPE) {
      throw(new Error("The files should be in a bitmap format"));
    }

    return file.type === this.FILE_TYPE;
  }
  private createImageFromData(imageData: Uint8Array): HTMLImageElement {
    const image: HTMLImageElement = new Image();
    const imageToCharCode: string[] = imageData.toString().split(",").map(Number).map((x) => String.fromCharCode(x));
    image.src = "data:image/bmp;base64," + btoa(imageToCharCode.join(""));

    return image;
  }
  public isImageDimensionValide(imageData: Uint8Array): boolean {
    const image: HTMLImageElement = this.createImageFromData(imageData);
    const isImageDimensionRespected: boolean = (image.width === this.IMAGE_WIDTH &&
                                                image.height === this.IMAGE_HEIGHT);

    if ( !isImageDimensionRespected ) {
      throw(new Error(`Image should be ${this.IMAGE_WIDTH} by ${this.IMAGE_HEIGHT}`));
    }

    return isImageDimensionRespected;
  }

  public isFormValide(name: string, originalImage: File, modifiedImage: File): boolean {
    return this.validateName(name) && this.isBMP(originalImage) && this.isBMP(modifiedImage);
  }
}
